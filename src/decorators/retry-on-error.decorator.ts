import { Logger, RequestTimeoutException } from '@nestjs/common';

class RetryOnErrorOptions {
  retryCount: number;
  delaySeconds: number;
}

export function RetryOnError(
  options: RetryOnErrorOptions = { delaySeconds: 5, retryCount: 5 },
): MethodDecorator {
  const logger = new Logger('RetryOnError');
  return (
    _: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const { delaySeconds, retryCount } = options;
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      for (let retryAttempts = 0; retryAttempts < retryCount; retryAttempts++) {
        try {
          const result = await originalMethod.apply(this, args);
          return result;
        } catch (error) {
          logger.warn(
            `[${
              retryAttempts + 1
            }|${retryCount}] Произошла ошибка при вызове ${propertyKey.toString()}. Повторная попытка через ${delaySeconds} секунд...`,
          );
          await delay(delaySeconds * 1000);
          retryAttempts++;
        }
      }
      const timeoutMessage = `Не удалось получить ответ от ${propertyKey.toString()} после ${retryCount} попыток.`;
      logger.error(timeoutMessage);
      throw new RequestTimeoutException(timeoutMessage);
    };
  };
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

import { HttpException, HttpStatus } from '@nestjs/common';

export class TronObserverException extends HttpException {
  constructor(message?: string, status?: HttpStatus) {
    super(
      {
        status: status || HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          message || 'Неизвестная ошибка при работе с наблюдателем сети TRON',
      },
      status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

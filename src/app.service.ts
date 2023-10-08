import { Injectable, Logger } from '@nestjs/common';
import applicationConstants from './config/applicationConstants';
import { ApplicationEnviroment } from './config/enums';

@Injectable()
export class AppService {
  private logger: Logger = new Logger(this.constructor.name);

  onModuleInit() {
    switch (applicationConstants.ENVIROMENT) {
      case ApplicationEnviroment.develop: {
        this.logger.debug(`Запущено в окружении разработки`);
        break;
      }
      case ApplicationEnviroment.production: {
        this.logger.log(`Запущено в продуктовой среде`);
        break;
      }
      default: {
        throw new Error('Неизвестная конфигурация окружения');
      }
    }
  }
  getApiInfo(): string {
    return 'USDT Exchanger';
  }
}

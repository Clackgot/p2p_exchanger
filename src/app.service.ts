import { Injectable, Logger } from '@nestjs/common';
import constants from './config/constants';

@Injectable()
export class AppService {
  private logger: Logger = new Logger(this.constructor.name);;

  constructor() {
    this.logger.debug(constants.TRONGRID_MAINNET_URL)
  }
  getHello(): string {
    return 'Hello World!';
  }
}

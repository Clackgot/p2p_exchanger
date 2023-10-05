import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private logger: Logger;

  constructor() {
    this.logger = new Logger(this.constructor.name);
  }
  getHello(): string {
    return 'Hello World!';
  }
}

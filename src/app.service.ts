import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private config: ConfigService) {
    console.log(this.config.get('TRONGRID_MAINNET_URL'));
  }
  getHello(): string {
    return 'Hello World!';
  }
}

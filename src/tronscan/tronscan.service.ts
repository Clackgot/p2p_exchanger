import { Injectable, Logger } from '@nestjs/common';
// import * as TronWeb from 'tronweb';
import * as TronWeb from 'tronweb';

@Injectable()
export class TronscanService {
  private logger = new Logger('TronscanService');
  constructor() {
    this.hello();
  }

  async hello(): Promise<void> {
    const tronWeb = new TronWeb({
      fullHost: 'https://shastapi.tronscan.org',
      headers: { 'TRON-PRO-API-KEY': 'TRON-PRO-API-KEY' },
    });
    const result = tronWeb.createAccount();
    console.log(result);
    // this.logger.verbose(tronWeb);
  }
}

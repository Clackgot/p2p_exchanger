import { Injectable } from '@nestjs/common';
import applicationConstants from 'src/config/applicationConstants';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as TronWeb from 'tronweb';

interface TronAccount {
  privateKey: string;
  publicKey: string;
  address: {
    base58: string;
    hex: string;
  };
}

@Injectable()
export class TronwebService {
  generateAddress(): TronAccount {
    const tronWeb = new TronWeb({
      fullHost: applicationConstants.TRONGRID.TRONGRID_API_URL,
      headers: {
        'TRON-PRO-API-KEY': applicationConstants.TRONGRID.TRONGRID_API_KEY,
      },
    });
    const account = TronWeb.createAccount();
    return account;
  }
  onModuleInit() {
    this.generateAddress();
  }
}
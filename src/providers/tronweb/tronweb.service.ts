import { BadRequestException, Injectable } from '@nestjs/common';
import applicationConstants from 'src/config/applicationConstants';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as TronWeb from 'tronweb';

enum ContractRet {
  REVERT = 'REVERT',
  SUCCESS = 'SUCCESS',
}

class TronWebError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

class TronWebBadwidthError extends TronWebError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

class TronWebRevertError extends TronWebError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

interface TronAccount {
  privateKey: string;
  publicKey: string;
  address: string;
  seedPhrase: string;
}

@Injectable()
export class TronwebService {
  private tronWeb = new TronWeb({
    fullHost: applicationConstants.TRONGRID.TRONGRID_API_URL,
    headers: {
      'TRON-PRO-API-KEY': applicationConstants.TRONGRID.TRONGRID_API_KEY,
    },
    privateKey: applicationConstants.STORAGE.PRIVATE_KEY,
  });

  async fromMnemonic(seedPhrase: string): Promise<TronAccount> {
    const result = await this.tronWeb.fromMnemonic(seedPhrase);
    const { address, privateKey, publicKey } = result;
    return {
      address,
      privateKey,
      publicKey,
      seedPhrase,
    };
  }

  async generateAddress(): Promise<TronAccount> {
    const result = await this.tronWeb.createRandom();
    const { address, privateKey, publicKey } = result;
    const seedPhrase = result?.mnemonic?.phrase;
    return {
      address,
      privateKey,
      publicKey,
      seedPhrase,
    };
  }

  async onModuleInit() {
    const address = await this.generateAddress();
    const addressFromMnemonic = await this.fromMnemonic(address.seedPhrase);
  }

  // TODO: Рефакторинг. Обработка ошибок
  async sendUSDTFromStorage(
    toAddress: string,
    amount: number,
  ): Promise<string> {
    try {
      const recipientHex = this.tronWeb.address.toHex(toAddress);
      const tokenAddress = applicationConstants.TETHER_USDT_TOKEN_ADDRESS;
      const tx = await this.tronWeb.contract().at(tokenAddress);
      const tx2 = await tx.transfer(recipientHex, amount * 1_000_000);
      const tx3: string = await tx2.send();
      console.log(tx3);
      const transactionInfo = await this.tronWeb.trx.getTransaction(tx3);
      console.log(transactionInfo);

      // if (transactionInfo?.ret?.at(0)?.contractRet === 'REVERT') {
      //   throw new TronWebRevertError('Недостаточно баланса для перевода');
      // }
      return transactionInfo;
    } catch (err) {
      if (err?.error === 'BANDWITH_ERROR') {
        throw new TronWebBadwidthError(err?.message);
      }
      throw err;
    }
  }

  // TODO: Рефакторинг. Обработка ошибок
  async sendTRXFromStorage(toAddress: string, amount: number) {
    const tradeobj = await this.tronWeb.transactionBuilder.sendTrx(
      this.tronWeb.address.toHex(toAddress),
      amount * 1_000_000,
      this.tronWeb.address.toHex(applicationConstants.STORAGE.ADDRESS),
    );
    const signedtxn = await this.tronWeb.trx.sign(
      tradeobj,
      applicationConstants.STORAGE.PRIVATE_KEY,
    );
    const transactionId = await this.tronWeb.trx.sendRawTransaction(signedtxn);
    return transactionId;
  }
}

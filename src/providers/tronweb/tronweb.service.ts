import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import applicationConstants from 'src/config/applicationConstants';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as TronWeb from 'tronweb';
import { TrongridService } from '../trongrid/trongrid.service';

enum TronWebErrorCode {
  REVERT = 'REVERT',
  SUCCESS = 'SUCCESS',
  BANDWITH_ERROR = 'BANDWITH_ERROR',
  CONTRACT_VALIDATE_ERROR = 'CONTRACT_VALIDATE_ERROR',
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

class TronWebContractValidateError extends TronWebError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

class TronWebInsufficientUSDTError extends TronWebError {
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
  private logger = new Logger(this.constructor.name);
  constructor(private readonly trongridService: TrongridService) {}

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
    try {
      const result = await this.sendUSDTFromStorage('<ADDRESS>', 1);
      console.log(result);
    } catch (err) {
      this.logger.error(err.message);
    }
  }

  async sendUSDTFromStorage(
    toAddress: string,
    amount: number,
  ): Promise<Boolean> {
    const storageAddress = applicationConstants.STORAGE.ADDRESS;
    const storageInfo = await this.trongridService.getAddressInfo(
      storageAddress,
    );

    if (amount > storageInfo.usdtTetherBalance) {
      const insufficiently: string = (
        amount - storageInfo.usdtTetherBalance
      ).toFixed(2);
      throw new TronWebInsufficientUSDTError(
        `Не хватает ${insufficiently} USDT для перевода`,
      );
    }

    try {
      const contract = await this.tronWeb
        .contract()
        .at(applicationConstants.TETHER_USDT_TOKEN_ADDRESS);
      const signedTransaction = await contract.transfer(
        toAddress,
        amount * 1_000_000,
      );

      const transaction: Boolean = await signedTransaction.send({
        shouldPollResponse: true,
      });
      return transaction;
    } catch (err) {
      switch (err?.error) {
        case TronWebErrorCode.BANDWITH_ERROR:
          throw new TronWebBadwidthError(err?.message);
        default:
          console.log(err);
          throw new TronWebError('Неизвестная ошибка');
      }
    }
  }

  async sendTRXFromStorage(toAddress: string, amount: number): Promise<string> {
    const transaction = await this.tronWeb.trx.sendTransaction(
      toAddress,
      amount * 1_000_000,
    );

    if (transaction?.result && transaction?.txid) {
      return transaction.txid;
    }

    switch (transaction?.code) {
      case TronWebErrorCode.BANDWITH_ERROR:
        throw new TronWebBadwidthError('Не хватает пропускной способности');
      case TronWebErrorCode.CONTRACT_VALIDATE_ERROR:
        throw new TronWebContractValidateError(
          'Не удалось подтвердить транзакцию',
        );
      default:
        throw new TronWebError('Неизвестная ошибка');
    }
  }
}

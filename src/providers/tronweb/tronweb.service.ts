import { Injectable } from '@nestjs/common';
import applicationConstants from 'src/config/applicationConstants';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as TronWeb from 'tronweb';
import { TronAccount } from 'src/models/tron-account.model';
import { ITronwebService } from './interfaces';

@Injectable()
export class TronwebService implements ITronwebService {
  constructor() {}

  private tronWeb = new TronWeb({
    fullHost: applicationConstants.TRONGRID.TRONGRID_API_URL,
    headers: {
      'TRON-PRO-API-KEY': applicationConstants.TRONGRID.TRONGRID_API_KEY,
    },
    privateKey: applicationConstants.STORAGE.PRIVATE_KEY,
  });

  async getTronAccountFromMnemonic(seedPhrase: string): Promise<TronAccount> {
    const result = await this.tronWeb.fromMnemonic(seedPhrase);
    const { address, privateKey, publicKey } = result;
    return {
      address,
      privateKey,
      publicKey,
      seedPhrase,
    };
  }

  async generateTronAccount(): Promise<TronAccount> {
    const result = await this.tronWeb.createRandom();
    let { privateKey, publicKey } = result;
    privateKey = privateKey?.replace('0x', '');
    publicKey = publicKey?.replace('0x', '');
    const address: string = result?.address;
    const seedPhrase: string = result?.mnemonic?.phrase;
    return {
      address,
      privateKey,
      publicKey,
      seedPhrase,
    };
  }

  // async sendUSDTFromStorage(
  //   toAddress: string,
  //   amount: number,
  // ): Promise<boolean> {
  //   const storageAddress = applicationConstants.STORAGE.ADDRESS;
  //   const storageInfo = await this.trongridService.getTronAccountInfoByAddress(
  //     storageAddress,
  //   );

  //   if (amount > storageInfo.usdt) {
  //     const insufficiently: string = (amount - storageInfo.usdt).toFixed(2);
  //     throw new TronWebInsufficientUSDTError(
  //       `Не хватает ${insufficiently} USDT для перевода`,
  //     );
  //   }

  //   try {
  //     const contract = await this.tronWeb
  //       .contract()
  //       .at(applicationConstants.TETHER_USDT_TOKEN_ADDRESS);
  //     const signedTransaction = await contract.transfer(
  //       toAddress,
  //       amount * 1_000_000,
  //     );

  //     const transaction: boolean = await signedTransaction.send({
  //       shouldPollResponse: true,
  //     });
  //     return transaction;
  //   } catch (err) {
  //     switch (err?.error) {
  //       case TronWebErrorCode.BANDWITH_ERROR:
  //         throw new TronWebBadwidthError(err?.message);
  //       default:
  //         this.logger.error(err);
  //         throw new TronWebError('Неизвестная ошибка');
  //     }
  //   }
  // }

  // async sendTRXFromStorage(toAddress: string, amount: number): Promise<string> {
  //   const transaction = await this.tronWeb.trx.sendTransaction(
  //     toAddress,
  //     amount * 1_000_000,
  //   );

  //   if (transaction?.result && transaction?.txid) {
  //     return transaction.txid;
  //   }

  //   switch (transaction?.code) {
  //     case TronWebErrorCode.BANDWITH_ERROR:
  //       throw new TronWebBadwidthError('Не хватает пропускной способности');
  //     case TronWebErrorCode.CONTRACT_VALIDATE_ERROR:
  //       throw new TronWebContractValidateError(
  //         'Не удалось подтвердить транзакцию',
  //       );
  //     default:
  //       throw new TronWebError('Неизвестная ошибка');
  //   }
  // }
}

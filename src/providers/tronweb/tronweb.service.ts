import { Injectable, Logger } from '@nestjs/common';
import applicationConstants from 'src/config/applicationConstants';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as TronWeb from 'tronweb';
import { TronAccount } from 'src/models/tron-account.model';
import { ITronwebService } from './interfaces';
import { Transaction, TransactionStatus } from 'src/models/transaction.model';
import { SendUsdtDto } from './dto/send-usdt.dto';
import { TronWebBadwidthError } from './errors/badwidth.error';
import { TronWebErrorCode } from './enums/error-code.enum';
import { TronWebError } from './errors/base.error';
import * as bs58 from 'bs58';
import { SendTrxDto } from './dto/send-trx.dto';
import { TronWebContractValidateError } from './errors/contract-validate.error';

@Injectable()
export class TronwebService implements ITronwebService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly tronWeb: TronWeb) {}

  async getAccountInfo(address: string): Promise<any> {
    const result = await this.tronWeb.trx.getUnconfirmedBalance(address);
    console.log(result);
    return result;
  }

  async sendTrx(dto: SendTrxDto): Promise<string> {
    this.tronWeb.setAddress(dto.from.address);
    this.tronWeb.setPrivateKey(dto.from.privateKey);
    const transaction = await this.tronWeb.trx.sendTransaction(
      dto.to.address,
      dto.trx * 1_000_000,
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

  async sendUsdt(dto: SendUsdtDto): Promise<Transaction> {
    this.tronWeb.setAddress(dto.from.address);
    this.tronWeb.setPrivateKey(dto.from.privateKey);
    const { to, usdt } = dto;
    try {
      const contract = await this.tronWeb
        .contract()
        .at(applicationConstants.TETHER_USDT_TOKEN_ADDRESS);
      const signedTransaction = await contract.transfer(
        to.address,
        usdt * 1_000_000,
      );

      const transactionId = await signedTransaction.send({
        shouldPollResponse: false,
      });
      return transactionId;
    } catch (err) {
      switch (err?.error) {
        case TronWebErrorCode.BANDWITH_ERROR:
          throw new TronWebBadwidthError(err?.message);
        default:
          this.logger.error(err);
          throw new TronWebError('Неизвестная ошибка');
      }
    }
  }

  getTronAccountFromMnemonic(seedPhrase: string): Omit<TronAccount, 'id'> {
    const result = this.tronWeb.fromMnemonic(seedPhrase);
    const { address, privateKey, publicKey } = result;
    return {
      address,
      privateKey,
      publicKey,
      seedPhrase,
    };
  }

  generateTronAccount(): Omit<TronAccount, 'id'> {
    const result = this.tronWeb.createRandom();
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

  hexToBase58(hex: string): string {
    const buffer = Buffer.from(hex, 'hex');
    return bs58.encode(buffer);
  }

  base58ToHex(base58: string): string {
    const bytes = bs58.decode(base58);
    const hex = Buffer.from(bytes).toString('hex').toUpperCase();
    return hex;
  }
}

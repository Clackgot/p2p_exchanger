import { Injectable, Logger, Scope } from '@nestjs/common';
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

@Injectable({ scope: Scope.REQUEST })
export class TronwebService implements ITronwebService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly tronWeb: TronWeb) {}
  async sendUsdt(dto: SendUsdtDto): Promise<Transaction> {
    const { from, to, usdt } = dto;
    try {
      const contract = await this.tronWeb
        .contract()
        .at(applicationConstants.TETHER_USDT_TOKEN_ADDRESS);
      const signedTransaction = await contract.transfer(
        from.tronAccount.address,
        usdt * 1_000_000,
      );

      const transaction: boolean = await signedTransaction.send({
        shouldPollResponse: true,
      });
      const data: Pick<Transaction, 'id' | 'status'> = {
        id: Math.random().toString(),
        status: TransactionStatus.Created,
      };
      return { ...dto, ...data, trx: 0 };
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
}

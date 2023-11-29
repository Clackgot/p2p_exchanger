import { Injectable } from '@nestjs/common';
import { Transaction, TransactionStatus } from 'src/models/transaction.model';
import { TronAccount } from 'src/models/tron-account.model';
import { ITrongridService } from 'src/providers/trongrid/interfaces';
import { TrongridService } from 'src/providers/trongrid/trongrid.service';
import { TronAccountInfo } from 'src/providers/trongrid/types';
import { SendTrxDto } from 'src/providers/tronweb/dto/send-trx.dto';
import { SendUsdtDto } from 'src/providers/tronweb/dto/send-usdt.dto';
import { ITronwebService } from 'src/providers/tronweb/interfaces';
import { TronwebService } from 'src/providers/tronweb/tronweb.service';
import { CreateTronAccountDto } from 'src/tron-accounts/dto/create-tron-account.dto';

interface ITronService extends ITronwebService, ITrongridService {}

@Injectable()
export class TronService implements ITronService {
  constructor(
    private readonly tronwebService: TronwebService,
    private readonly trongridService: TrongridService,
  ) {}
  async isAccountActivate(account: TronAccount): Promise<boolean> {
    return this.tronwebService.isAccountActivate(account);
  }

  base58ToHex(base58: string): string {
    return this.tronwebService.base58ToHex(base58);
  }
  hexToBase58(hex: string): string {
    return this.tronwebService.hexToBase58(hex);
  }
  async sendUsdt(dto: SendUsdtDto): Promise<string> {
    return this.tronwebService.sendUsdt(dto);
  }
  async getTransaction(transactionId: string): Promise<any> {
    const transaction = await this.tronwebService.getTransaction(transactionId);
    return transaction;
  }
  async getTransactionInfo(transactionId: string): Promise<any> {
    const transaction = await this.tronwebService.getTransactionInfo(
      transactionId,
    );
    return transaction;
  }

  async sendTrx(dto: SendTrxDto): Promise<string> {
    return this.tronwebService.sendTrx(dto);
  }

  getTronAccountFromMnemonic(seedPhrase: string): CreateTronAccountDto {
    return this.tronwebService.getTronAccountFromMnemonic(seedPhrase);
  }
  generateTronAccount(): CreateTronAccountDto {
    return this.tronwebService.generateTronAccount();
  }

  fromMnemonic(seedPhrase: string): CreateTronAccountDto {
    return this.tronwebService.getTronAccountFromMnemonic(seedPhrase);
  }
  async getTronAccountInfoByAddress(address: string): Promise<TronAccountInfo> {
    return this.trongridService.getTronAccountInfoByAddress(address);
  }

  async getAccountInfo(address: string): Promise<any> {
    return this.tronwebService.getAccountInfo(address);
  }

  async getTransactionStatus(id: string): Promise<TransactionStatus> {
    const transactionInfo1 = await this.getTransaction(id);
    const transactionInfo2 = await this.getTransactionInfo(id);

    const successCondition1 =
      transactionInfo1?.ret?.[0]?.contractRet === TransactionStatus.Success;

    const successCondition2 =
      JSON.stringify(transactionInfo2?.contractResult) === JSON.stringify(['']);

    const revertCondition1 =
      transactionInfo1?.ret?.[0]?.contractRet === TransactionStatus.Revert;
    const revertCondition2 =
      transactionInfo2?.receipt?.result === TransactionStatus.Revert;

    if (successCondition1 && successCondition2)
      return TransactionStatus.Success;

    if (revertCondition1 || revertCondition2) return TransactionStatus.Revert;

    return TransactionStatus.Created;
  }
}

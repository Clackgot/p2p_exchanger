import { Injectable } from '@nestjs/common';
import { Transaction } from 'src/models/transaction.model';
import { TronAccount } from 'src/models/tron-account.model';
import { ITrongridService } from 'src/providers/trongrid/interfaces';
import { TrongridService } from 'src/providers/trongrid/trongrid.service';
import { TronAccountInfo } from 'src/providers/trongrid/types';
import { SendUsdtDto } from 'src/providers/tronweb/dto/send-usdt.dto';
import { ITronwebService } from 'src/providers/tronweb/interfaces';
import { TronwebService } from 'src/providers/tronweb/tronweb.service';

interface ITronService extends ITronwebService, ITrongridService {}

@Injectable()
export class TronService implements ITronService {
  constructor(
    private readonly tronwebService: TronwebService,
    private readonly trongridService: TrongridService,
  ) {}
  base58ToHex(base58: string): string {
    return this.tronwebService.base58ToHex(base58);
  }
  hexToBase58(hex: string): string {
    return this.tronwebService.hexToBase58(hex);
  }
  async sendUsdt(dto: SendUsdtDto): Promise<Transaction> {
    return this.tronwebService.sendUsdt(dto);
  }

  getTronAccountFromMnemonic(seedPhrase: string): Omit<TronAccount, 'id'> {
    return this.tronwebService.getTronAccountFromMnemonic(seedPhrase);
  }
  generateTronAccount(): Omit<TronAccount, 'id'> {
    return this.tronwebService.generateTronAccount();
  }

  fromMnemonic(seedPhrase: string): Omit<TronAccount, 'id'> {
    return this.tronwebService.getTronAccountFromMnemonic(seedPhrase);
  }
  async getTronAccountInfoByAddress(address: string): Promise<TronAccountInfo> {
    return this.trongridService.getTronAccountInfoByAddress(address);
  }
}

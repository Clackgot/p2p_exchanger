import { Injectable } from '@nestjs/common';
import { TronAccount } from 'src/models/tron-account.model';
import { ITrongridService } from 'src/providers/trongrid/interfaces';
import { TrongridService } from 'src/providers/trongrid/trongrid.service';
import { TronAccountInfo } from 'src/providers/trongrid/types';
import { ITronwebService } from 'src/providers/tronweb/interfaces';
import { TronwebService } from 'src/providers/tronweb/tronweb.service';

interface ITronService extends ITronwebService, ITrongridService {}

@Injectable()
export class TronService implements ITronService {
  constructor(
    private readonly tronwebService: TronwebService,
    private readonly trongridService: TrongridService,
  ) {}

  async getTronAccountFromMnemonic(seedPhrase: string): Promise<TronAccount> {
    return this.tronwebService.getTronAccountFromMnemonic(seedPhrase);
  }
  async generateTronAccount(): Promise<TronAccount> {
    return this.tronwebService.generateTronAccount();
  }

  async fromMnemonic(seedPhrase: string): Promise<TronAccount> {
    return this.tronwebService.getTronAccountFromMnemonic(seedPhrase);
  }
  async getTronAccountInfoByAddress(address: string): Promise<TronAccountInfo> {
    return this.trongridService.getTronAccountInfoByAddress(address);
  }
}

import { Injectable } from '@nestjs/common';
import { TronAccountsRepository } from './tron-accounts.repository';
import { TronAccount } from 'src/models/tron-account.model';
import { UpdateTronAccountDto } from './dto/update-tron-account.dto';
import { TronService } from 'src/tron/tron.service';

@Injectable()
export class TronAccountsService {
  constructor(
    private readonly tronAccountsRepository: TronAccountsRepository,
    private readonly tronService: TronService,
  ) {}

  async getAll(): Promise<TronAccount[]> {
    return this.tronAccountsRepository.getAll();
  }

  async generateTronAccount(): Promise<TronAccount> {
    const account = await this.tronService.generateTronAccount();
    return this.tronAccountsRepository.createTronAccount(account);
  }

  async getByAddress(address: string): Promise<TronAccount> {
    return this.tronAccountsRepository.getByAddress(address);
  }

  async updateAccount(
    address: string,
    updateTronAccountDto: UpdateTronAccountDto,
  ): Promise<TronAccount> {
    return this.tronAccountsRepository.updateAccount(
      address,
      updateTronAccountDto,
    );
  }
}

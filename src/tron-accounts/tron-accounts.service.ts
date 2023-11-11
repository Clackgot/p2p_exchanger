import { Injectable } from '@nestjs/common';
import { TronAccountsRepository } from './tron-accounts.repository';
import { TronAccount } from 'src/models/tron-account.model';
import { CreateTronAccountDto } from './dto/create-tron-account.dto';
import { UpdateTronAccountDto } from './dto/update-tron-account.dto';

@Injectable()
export class TronAccountsService {
  constructor(
    private readonly tronAccountsRepository: TronAccountsRepository,
  ) {}

  async getAll(): Promise<TronAccount[]> {
    return this.tronAccountsRepository.getAll();
  }

  async createTronAccount(dto: CreateTronAccountDto): Promise<TronAccount> {
    return this.tronAccountsRepository.createTronAccount(dto);
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

  async removeAccount(address: string): Promise<TronAccount> {
    return this.tronAccountsRepository.removeAccount(address);
  }
}

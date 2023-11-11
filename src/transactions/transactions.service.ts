import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from './transactions.repository';
import { Transaction } from 'src/models/transaction.model';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TronAccountsService } from 'src/tron-accounts/tron-accounts.service';
import { TransactionException } from './errors/base/transaction.exception';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly tronAccountsService: TronAccountsService,
  ) {}

  async getTransations(): Promise<Transaction[]> {
    return this.transactionsRepository.getTransations();
  }

  async createTransation(dto: CreateTransactionDto): Promise<Transaction> {
    const from = await this.tronAccountsService.getByAddress(dto.from.address);
    const to = await this.tronAccountsService.getByAddress(dto.to.address);

    dto.from = from;
    dto.to = to;
    try {
      return this.transactionsRepository.createTransation(dto);
    } catch (error) {
      throw new TransactionException(error);
    }
  }
}

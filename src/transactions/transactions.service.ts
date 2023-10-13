import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from './transactions.repository';
import { Transaction } from 'src/models/transaction.model';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async getTransations(): Promise<Transaction[]> {
    return this.transactionsRepository.getTransations();
  }
}

import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from './transactions.repository';
import { Transaction } from 'src/models/transaction.model';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async getTransations(): Promise<Transaction[]> {
    return this.transactionsRepository.getTransations();
  }

  async createTransation(dto: CreateTransactionDto): Promise<Transaction> {
    return this.transactionsRepository.createTransation(dto);
  }
}

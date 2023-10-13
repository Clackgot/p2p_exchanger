import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/models/transaction.model';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {}

  async getTransations(): Promise<Transaction[]> {
    return this.transactionsRepository.find();
  }
}

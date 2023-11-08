import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/models/transaction.model';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { User } from 'src/models/user.model';

@Injectable()
export class TransactionsRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async getTransations(): Promise<Transaction[]> {
    return this.transactionsRepository.find();
  }

  async createTransation(dto: CreateTransactionDto): Promise<Transaction> {
    const transaction: Transaction = new Transaction();
    transaction.recipient = dto.recipient;
    transaction.sender = dto.sender;
    transaction.trx = dto.trx;
    transaction.usdt = dto.usdt;
    return this.transactionsRepository.save(transaction);
  }
}

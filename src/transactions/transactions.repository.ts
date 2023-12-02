import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction, TransactionStatus } from 'src/models/transaction.model';
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
    return this.transactionsRepository.save(dto);
  }

  async getTransactionById(id: string): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findOne({
      where: { id },
    });
    if (!transaction) throw new NotFoundException('Транзакция не найдена');
    return transaction;
  }

  async updateTransactionStatus(id: string, status: TransactionStatus) {
    const transaction = await this.getTransactionById(id);
    transaction.status = status;
    return this.transactionsRepository.save(transaction);
  }
}

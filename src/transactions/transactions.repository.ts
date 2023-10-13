import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/models/transaction.model';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { User } from 'src/models/user.model';
import { TransactionAmount } from 'src/models/transaction-amount.model';

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

  // TODO доделать и решить проблему с ошибкой Cannot perform update query because update values are not defined. Call "qb.set(...)" method to specify updated values
  async createTransation(dto: CreateTransactionDto): Promise<any> {
    const sender: User = await this.usersRepository.findOneOrFail({
      where: { id: dto.senderId },
    });
    const recipient: User = await this.usersRepository.findOneOrFail({
      where: { id: dto.recipientId },
    });
    const transactionAmount: TransactionAmount = dto.transferAmount;
    const transaction: Transaction = new Transaction();
    transaction.recipient = recipient;
    transaction.sender = sender;
    transaction.transferAmount = transactionAmount;
    return this.transactionsRepository.save(transaction);
    return null;
  }
}

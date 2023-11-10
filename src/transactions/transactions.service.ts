import { Injectable } from '@nestjs/common';
import { TransactionsRepository } from './transactions.repository';
import { Transaction } from 'src/models/transaction.model';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UsersService } from 'src/users/users.service';
import {
  TransactionException,
  UserNotFoundException,
} from './errors/user-not-found.exception';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly usersService: UsersService,
  ) {}

  async getTransations(): Promise<Transaction[]> {
    return this.transactionsRepository.getTransations();
  }

  async createTransation(dto: CreateTransactionDto): Promise<Transaction> {
    const fromUser = await this.usersService.getUserById(dto.from.id);
    const toUser = await this.usersService.getUserById(dto.to.id);
    if (!fromUser) throw new UserNotFoundException(dto?.from?.id);

    if (!toUser) throw new UserNotFoundException(dto?.to?.id);
    dto.from = fromUser;
    dto.to = fromUser;
    try {
      return this.transactionsRepository.createTransation(dto);
    } catch (error) {
      throw new TransactionException(error);
    }
  }
}

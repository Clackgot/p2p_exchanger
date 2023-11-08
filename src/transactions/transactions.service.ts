import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const sender = await this.usersService.getUserById(dto.sender.id);
    const recipient = await this.usersService.getUserById(dto.recipient.id);
    if (!sender) throw new UserNotFoundException(dto?.sender?.id);

    if (!recipient) throw new UserNotFoundException(dto?.recipient?.id);
    dto.sender = sender;
    dto.recipient = sender;
    try {
      return this.transactionsRepository.createTransation(dto);
    } catch (error) {
      throw new TransactionException(error);
    }
  }
}

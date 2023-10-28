import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from 'src/models/transaction.model';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async getTransations(): Promise<Transaction[]> {
    return this.transactionsService.getTransations();
  }

  @Post()
  async createTransation(
    @Body() dto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionsService.createTransation(dto);
  }
}

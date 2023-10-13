import { Controller, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from 'src/models/transaction.model';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async getTransations(): Promise<Transaction[]> {
    return this.transactionsService.getTransations();
  }
}

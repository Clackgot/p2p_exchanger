import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/models/transaction.model';
import { TransactionsRepository } from './transactions.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  providers: [TransactionsService, TransactionsRepository],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
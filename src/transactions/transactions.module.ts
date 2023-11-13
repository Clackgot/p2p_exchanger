import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/models/transaction.model';
import { TransactionsRepository } from './transactions.repository';
import { User } from 'src/models/user.model';
import { UsersModule } from 'src/users/users.module';
import { TronAccountsModule } from 'src/tron-accounts/tron-accounts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, User]),
    UsersModule,
    TronAccountsModule,
  ],
  providers: [TransactionsService, TransactionsRepository],
  controllers: [TransactionsController],
  exports: [TransactionsService],
})
export class TransactionsModule {}

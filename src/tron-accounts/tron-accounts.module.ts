import { Module } from '@nestjs/common';
import { TronAccountsService } from './tron-accounts.service';
import { TronAccountsController } from './tron-accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TronAccount } from 'src/models/tron-account.model';
import { TronAccountsRepository } from './tron-accounts.repository';
import { TronModule } from 'src/tron/tron.module';

@Module({
  imports: [TypeOrmModule.forFeature([TronAccount]), TronModule],
  providers: [TronAccountsService, TronAccountsRepository],
  controllers: [TronAccountsController],
  exports: [TronAccountsService],
})
export class TronAccountsModule {}

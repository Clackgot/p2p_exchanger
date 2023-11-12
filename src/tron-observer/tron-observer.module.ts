import { Module } from '@nestjs/common';
import { TronObserverService } from './tron-observer.service';
import { UsersModule } from 'src/users/users.module';
import { TronModule } from 'src/tron/tron.module';
import { TronAccountsModule } from 'src/tron-accounts/tron-accounts.module';

@Module({
  imports: [UsersModule, TronModule, TronAccountsModule],
  providers: [TronObserverService],
})
export class TronObserverModule {}

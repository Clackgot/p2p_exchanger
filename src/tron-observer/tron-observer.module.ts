import { Module } from '@nestjs/common';
import { TronObserverService } from './tron-observer.service';
import { UsersModule } from 'src/users/users.module';
import { TrongridModule } from 'src/providers/trongrid/trongrid.module';
import { TronModule } from 'src/tron/tron.module';

@Module({
  imports: [UsersModule, TronModule],
  providers: [TronObserverService],
})
export class TronObserverModule {}

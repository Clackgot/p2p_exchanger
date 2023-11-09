import { Module } from '@nestjs/common';
import { TronObserverService } from './tron-observer.service';
import { UsersModule } from 'src/users/users.module';
import { TrongridModule } from 'src/providers/trongrid/trongrid.module';

@Module({
  imports: [UsersModule, TrongridModule],
  providers: [TronObserverService],
})
export class TronObserverModule {}

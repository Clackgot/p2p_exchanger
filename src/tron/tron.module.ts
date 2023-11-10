import { Module } from '@nestjs/common';
import { TronService } from './tron.service';
import { TronwebModule } from 'src/providers/tronweb/tronweb.module';
import { TrongridModule } from 'src/providers/trongrid/trongrid.module';

@Module({
  imports: [TronwebModule, TrongridModule],
  providers: [TronService],
})
export class TronModule {}

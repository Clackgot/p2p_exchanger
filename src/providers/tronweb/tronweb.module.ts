import { Module } from '@nestjs/common';
import { TronwebService } from './tronweb.service';
import { TrongridModule } from '../trongrid/trongrid.module';

@Module({
  imports: [TrongridModule],
  providers: [TronwebService],
})
export class TronwebModule {}

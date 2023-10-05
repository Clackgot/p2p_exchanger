import { Module } from '@nestjs/common';
import { TrongridService } from './trongrid.service';

@Module({
  providers: [TrongridService]
})
export class TrongridModule {}

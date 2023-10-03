import { Module } from '@nestjs/common';
import { TronscanService } from './tronscan.service';

@Module({
  providers: [TronscanService],
})
export class TronscanModule {}

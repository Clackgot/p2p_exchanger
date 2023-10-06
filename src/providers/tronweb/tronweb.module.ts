import { Module } from '@nestjs/common';
import { TronwebService } from './tronweb.service';

@Module({
  providers: [TronwebService]
})
export class TronwebModule {}

import { Module } from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { MerchantsController } from './merchants.controller';
import { MockMerchantsRepository } from './merchants.mock-repository';

@Module({
  providers: [MerchantsService, MockMerchantsRepository],
  controllers: [MerchantsController],
})
export class MerchantsModule {}

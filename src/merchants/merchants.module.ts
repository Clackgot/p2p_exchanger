import { Module } from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { MerchantsController } from './merchants.controller';
import { MerchantsRepository } from './merchants.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { TronModule } from 'src/tron/tron.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TronModule],
  providers: [MerchantsService, MerchantsRepository],
  controllers: [MerchantsController],
  exports: [MerchantsService],
})
export class MerchantsModule {}

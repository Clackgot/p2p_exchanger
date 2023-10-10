import { Module } from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { MerchantsController } from './merchants.controller';
import { MerchantsRepository } from './merchants.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [MerchantsService, MerchantsRepository],
  controllers: [MerchantsController],
})
export class MerchantsModule {}

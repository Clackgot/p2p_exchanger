import { Module } from '@nestjs/common';
import { TradersService } from './traders.service';
import { TradersController } from './traders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { TradersRepository } from './traders.repository';
import { TronModule } from 'src/tron/tron.module';

@Module({
  imports: [TronModule, TypeOrmModule.forFeature([User])],
  providers: [TradersService, TradersRepository],
  controllers: [TradersController],
  exports: [TradersService],
})
export class TradersModule {}

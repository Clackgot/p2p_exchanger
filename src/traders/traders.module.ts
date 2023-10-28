import { Module } from '@nestjs/common';
import { TradersService } from './traders.service';
import { TradersController } from './traders.controller';
import { TronwebModule } from 'src/providers/tronweb/tronweb.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { TradersRepository } from './traders.repository';

@Module({
  imports: [TronwebModule, TypeOrmModule.forFeature([User])],
  providers: [TradersService, TradersRepository],
  controllers: [TradersController],
  exports: [TradersService],
})
export class TradersModule {}

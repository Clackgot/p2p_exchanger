import { Module } from '@nestjs/common';
import { TradersService } from './traders.service';
import { TradersController } from './traders.controller';
import { MockTradersRepository } from './traders.mock-repository';

@Module({
  providers: [TradersService, MockTradersRepository],
  controllers: [TradersController],
})
export class TradersModule {}

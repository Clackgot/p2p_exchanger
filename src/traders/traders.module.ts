import { Module } from '@nestjs/common';
import { TradersService } from './traders.service';
import { TradersController } from './traders.controller';
import { MockTradersRepository } from './traders.mock-repository';
import { TronwebModule } from 'src/providers/tronweb/tronweb.module';

@Module({
  imports: [TronwebModule],
  providers: [TradersService, MockTradersRepository],
  controllers: [TradersController],
})
export class TradersModule {}

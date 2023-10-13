import { Module } from '@nestjs/common';
import { ExchangerService } from './exchanger.service';
import { ExchangerController } from './exchanger.controller';
import { MerchantsModule } from 'src/merchants/merchants.module';
import { TradersModule } from 'src/traders/traders.module';
import { ExchangerRepository } from './exchanger.repository';

@Module({
  imports: [MerchantsModule, TradersModule],
  providers: [ExchangerService, ExchangerRepository],
  controllers: [ExchangerController],
})
export class ExchangerModule {}

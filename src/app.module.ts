import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangerModule } from './exchanger/exchanger.module';
import { TradersModule } from './traders/traders.module';
import { MerchantsModule } from './merchants/merchants.module';
import { TronscanModule } from './providers/tronscan/tronscan.module';
import { TrongridModule } from './providers/trongrid/trongrid.module';

@Module({
  imports: [
    ExchangerModule,
    TradersModule,
    MerchantsModule,
    TronscanModule,
    TrongridModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

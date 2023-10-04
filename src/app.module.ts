import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangerModule } from './exchanger/exchanger.module';
import { TradersModule } from './traders/traders.module';
import { MerchantsModule } from './merchants/merchants.module';
import { TronscanModule } from './tronscan/tronscan.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ExchangerModule,
    TradersModule,
    MerchantsModule,
    TronscanModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

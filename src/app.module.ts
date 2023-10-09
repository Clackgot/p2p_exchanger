import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangerModule } from './exchanger/exchanger.module';
import { TradersModule } from './traders/traders.module';
import { MerchantsModule } from './merchants/merchants.module';
import { TrongridModule } from './providers/trongrid/trongrid.module';
import { TronwebModule } from './providers/tronweb/tronweb.module';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';

@Module({
  imports: [
    ExchangerModule,
    TradersModule,
    MerchantsModule,
    TrongridModule,
    TronwebModule,
    TelegramBotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

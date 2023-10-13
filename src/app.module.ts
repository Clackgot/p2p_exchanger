import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TradersModule } from './traders/traders.module';
import { MerchantsModule } from './merchants/merchants.module';
import { TrongridModule } from './providers/trongrid/trongrid.module';
import { TronwebModule } from './providers/tronweb/tronweb.module';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './config/orm.config';
import { DealsModule } from './deals/deals.module';
import { ExchangerModule } from './exchanger/exchanger.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    TradersModule,
    MerchantsModule,
    TrongridModule,
    TronwebModule,
    TelegramBotModule,
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    DealsModule,
    ExchangerModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

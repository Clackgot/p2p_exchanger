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
import { BalancesModule } from './balances/balances.module';
import { CardsModule } from './cards/cards.module';
import { UsersModule } from './users/users.module';
import { TronObserverModule } from './tron-observer/tron-observer.module';

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
    BalancesModule,
    CardsModule,
    UsersModule,
    TronObserverModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

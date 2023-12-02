import { Module } from '@nestjs/common';
import { TrongridModule } from 'src/providers/trongrid/trongrid.module';
import { UsersModule } from 'src/users/users.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { AdminScene } from './scenes/admin/admin.scene';
import { AppUpdate } from './updates/app.update';
import { MerchantScene } from './scenes/merchant/merchant.scene';
import { TraderScene } from './scenes/trader/trader.scene';
import { GuestScene } from './scenes/guest/guest.scene';
import { TraderCardsScene } from './scenes/trader/cards/cards.scene';
import { CardsModule } from 'src/cards/cards.module';
import { AddCardScene } from './scenes/trader/cards/add-card.scene';
import { UsersService } from 'src/users/users.service';
import { TelegrafConfigurator } from './telegraf-configurator.service';

@Module({
  imports: [
    TrongridModule,
    UsersModule,
    CardsModule,
    TelegrafModule.forRootAsync({
      useClass: TelegrafConfigurator,
      imports: [UsersModule],
      inject: [UsersService],
    }),
  ],
  providers: [
    AdminScene,
    GuestScene,
    MerchantScene,
    TraderScene,
    AppUpdate,
    TraderCardsScene,
    AddCardScene,
    TelegrafConfigurator,
  ],
})
export class TelegramBotModule {}

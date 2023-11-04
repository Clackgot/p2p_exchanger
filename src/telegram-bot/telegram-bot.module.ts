import { Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { TrongridModule } from 'src/providers/trongrid/trongrid.module';
import { UsersModule } from 'src/users/users.module';
import { TelegrafModule } from 'nestjs-telegraf';
import applicationConstants from 'src/config/applicationConstants';
import { AdminScene } from './scenes/admin/admin.scene';
import { AppUpdate } from './updates/app.update';
import { session } from 'telegraf';
import { MerchantScene } from './scenes/merchant/merchant.scene';
import { TraderScene } from './scenes/trader/trader.scene';
import { GuestScene } from './scenes/guest/guest.scene';
import { TraderCardsScene } from './scenes/trader/cards/cards.scene';
import { CardsModule } from 'src/cards/cards.module';
import { AddCardScene } from './scenes/trader/cards/add-card.scene';
import { Redis } from '@telegraf/session/redis';
const store = Redis({
  url: `redis://${applicationConstants.REDIS.HOST}:${applicationConstants.REDIS.PORT}`,
  config: {
    password: applicationConstants.REDIS.PASSWORD,
  },
});

@Module({
  imports: [
    TrongridModule,
    UsersModule,
    CardsModule,
    TelegrafModule.forRoot({
      token: applicationConstants.TELEGRAM.TELEGRAM_BOT_TOKEN,
      middlewares: [session({ store })],
    }),
  ],
  providers: [
    TelegramBotService,
    AdminScene,
    GuestScene,
    MerchantScene,
    TraderScene,
    AppUpdate,
    TraderCardsScene,
    AddCardScene,
  ],
})
export class TelegramBotModule {}

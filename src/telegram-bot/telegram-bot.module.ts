import { Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { TrongridModule } from 'src/providers/trongrid/trongrid.module';
import { UsersModule } from 'src/users/users.module';
import { TelegrafModule } from 'nestjs-telegraf';
import applicationConstants from 'src/config/applicationConstants';
import { AdminScene } from './scenes/admin.scene';
import { AppUpdate } from './updates/app.update';
import { session } from 'telegraf';
import { MerchantScene } from './scenes/merchant.scene';
import { TraderScene } from './scenes/trader.scene';
import { GuestScene } from './scenes/guest.scene';

@Module({
  imports: [
    TrongridModule,
    UsersModule,
    TelegrafModule.forRoot({
      token: applicationConstants.TELEGRAM.TELEGRAM_BOT_TOKEN,
      middlewares: [session()],
    }),
  ],
  providers: [
    TelegramBotService,
    AdminScene,
    GuestScene,
    MerchantScene,
    TraderScene,
    AppUpdate,
  ],
})
export class TelegramBotModule {}

import { Module, NotFoundException } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { TrongridModule } from 'src/providers/trongrid/trongrid.module';
import { UsersModule } from 'src/users/users.module';
import { TelegrafModule, TelegrafModuleOptions } from 'nestjs-telegraf';
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
import { WizardContext } from 'telegraf/typings/scenes';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TrongridModule,
    UsersModule,
    CardsModule,
    TelegrafModule.forRootAsync({
      useFactory: (usersService: UsersService): TelegrafModuleOptions => {
        return {
          token: applicationConstants.TELEGRAM.TELEGRAM_BOT_TOKEN,
          middlewares: [
            session(),
            async (ctx: WizardContext, next: any) => {
              const id = ctx.message?.from.id;
              if (!id) throw new NotFoundException('Не удалось получить ID');
              const user = await usersService.getUserByTelegramId(id);
              if (!user)
                throw new NotFoundException('Не удалось найти пользователя');
              ctx.state.role = user.role;
              await next();
            },
          ],
        };
      },
      imports: [UsersModule],
      inject: [UsersService],
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

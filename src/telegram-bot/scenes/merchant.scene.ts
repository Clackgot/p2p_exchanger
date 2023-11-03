import { Context, Scene, SceneEnter, Hears } from 'nestjs-telegraf';
import { TrongridService } from 'src/providers/trongrid/trongrid.service';
import { UsersService } from 'src/users/users.service';
import { Scenes } from 'telegraf';
import { BotScenes } from '../constants';
import { SceneContext } from 'telegraf/typings/scenes';
import { Update } from 'telegraf/typings/core/types/typegram';

enum MerchantCommands {
  getMyBalance = 'Узнать баланс',
}

@Scene(BotScenes.merchant)
export class MerchantScene {
  constructor(
    private readonly trongridService: TrongridService,
    private readonly usersService: UsersService,
  ) {}

  @SceneEnter()
  async step1(@Context() ctx: Scenes.SceneContext) {
    if (!ctx.message?.from) return 'Не удалось найти пользователя';

    const { id } = ctx.message?.from;
    const user = await this.usersService.getUserByTelegramId(id);
    await ctx.reply(`[${user?.role}] Добро пожаловать!`, {
      reply_markup: {
        keyboard: [[{ text: MerchantCommands.getMyBalance }]],
      },
    });
  }

  @Hears(MerchantCommands.getMyBalance)
  async getMyBalance(
    @Context() ctx: SceneContext & { update: Update.CallbackQueryUpdate },
  ) {
    const id = ctx.message?.from?.id;
    if (!id) return 'Не удалось получить баланс';
    const user = await this.usersService.getUserByTelegramId(id);
    await ctx.reply(`Баланс: ${user?.balance.usdt} USDT`);
  }
}

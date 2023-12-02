import { Context, Scene, SceneEnter, Hears } from 'nestjs-telegraf';
import { UsersService } from 'src/users/users.service';
import { BotScenes } from '../../constants';
import { SceneContext } from 'telegraf/typings/scenes';

enum MerchantCommands {
  getMyBalance = 'Узнать баланс',
}

@Scene(BotScenes.merchant)
export class MerchantScene {
  constructor(private readonly usersService: UsersService) {}

  @SceneEnter()
  async welcomeMessage(@Context() ctx: SceneContext) {
    await ctx.reply(`[${ctx.state.role}] Добро пожаловать!`, {
      reply_markup: {
        keyboard: [[{ text: MerchantCommands.getMyBalance }]],
      },
    });
  }

  @Hears(MerchantCommands.getMyBalance)
  async showBalance(@Context() ctx: SceneContext) {
    const id = ctx.message?.from?.id;
    if (!id) return 'Не удалось получить баланс';
    const user = await this.usersService.getUserByTelegramId(id);
    await ctx.reply(`Баланс: ${user?.balance.usdt} USDT`);
  }
}

import { Context, Scene, SceneEnter, Action, Hears } from 'nestjs-telegraf';
import { TrongridService } from 'src/providers/trongrid/trongrid.service';
import { UsersService } from 'src/users/users.service';
import { Scenes } from 'telegraf';
import { BotScenes } from '../../constants';
import { Update } from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';

enum AdminCommands {
  getUsersCount = 'Количество пользователей в системе',
  getMyBalance = 'Узнать баланс',
}

@Scene(BotScenes.admin)
export class AdminScene {
  constructor(
    private readonly trongridService: TrongridService,
    private readonly usersService: UsersService,
  ) {}

  @SceneEnter()
  async step1(@Context() ctx: Scenes.SceneContext) {
    if (!ctx.message?.from) return 'Не удалось найти пользователя';

    const { id } = ctx.message?.from;
    const user = await this.usersService.getUserByTelegramId(id);

    await ctx.reply(`[${user?.role}] Добро пожаловать в админку!`, {
      reply_markup: {
        keyboard: [
          [{ text: AdminCommands.getUsersCount }],
          [{ text: AdminCommands.getMyBalance }],
        ],
      },
    });
  }

  @Hears(AdminCommands.getUsersCount)
  async getUsersCount(
    @Context() ctx: SceneContext & { update: Update.CallbackQueryUpdate },
  ) {
    const users = await this.usersService.getAllUsers();
    await ctx.reply(`Пользователей в системе: ${users.length}`);
  }

  @Hears(AdminCommands.getMyBalance)
  async getMyBalance(
    @Context() ctx: SceneContext & { update: Update.CallbackQueryUpdate },
  ) {
    const id = ctx.message?.from?.id;
    if (!id) return 'Не удалось получить баланс';
    const user = await this.usersService.getUserByTelegramId(id);
    await ctx.reply(`Баланс: ${user?.balance.usdt} USDT`);
  }
}

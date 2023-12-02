import { Context, Scene, SceneEnter, Hears } from 'nestjs-telegraf';
import { UsersService } from 'src/users/users.service';
import { BotScenes } from '../../constants';
import { SceneContext } from 'telegraf/typings/scenes';

enum AdminCommands {
  getUsersCount = 'Количество пользователей в системе',
  getMyBalance = 'Узнать баланс',
}

@Scene(BotScenes.admin)
export class AdminScene {
  constructor(private readonly usersService: UsersService) {}

  @SceneEnter()
  async step1(@Context() ctx: SceneContext) {
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
  async getUsersCount(@Context() ctx: SceneContext) {
    const users = await this.usersService.getAllUsers();
    await ctx.reply(`Пользователей в системе: ${users.length}`);
  }

  @Hears(AdminCommands.getMyBalance)
  async getMyBalance(@Context() ctx: SceneContext) {
    const id = ctx.message?.from?.id;
    if (!id) return 'Не удалось получить баланс';
    const user = await this.usersService.getUserByTelegramId(id);
    await ctx.reply(`Баланс: ${user?.balance.usdt} USDT`);
  }
}

import { Context, Scene, SceneEnter } from 'nestjs-telegraf';
import { TrongridService } from 'src/providers/trongrid/trongrid.service';
import { UsersService } from 'src/users/users.service';
import { Scenes } from 'telegraf';
import { BotScenes } from '../constants';

@Scene(BotScenes.guest)
export class GuestScene {
  constructor(
    private readonly trongridService: TrongridService,
    private readonly usersService: UsersService,
  ) {}

  @SceneEnter()
  async step1(@Context() ctx: Scenes.SceneContext) {
    if (!ctx.message?.from) return 'Не удалось найти пользователя';
    const { id } = ctx.message?.from;
    const user = await this.usersService.getUserByTelegramId(id);
    if (user?.telegramUser?.username) {
      return `[${user?.role}] Добро пожаловать, ${user?.telegramUser.username}`;
    } else {
      return `[${user?.role}] Добро пожаловать!`;
    }
  }
}

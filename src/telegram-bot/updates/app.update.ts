import { Ctx, Help, Start, Update } from 'nestjs-telegraf';
import { TrongridService } from 'src/providers/trongrid/trongrid.service';
import { UsersService } from 'src/users/users.service';
import { Context } from 'telegraf';
import { SceneContext } from 'telegraf/typings/scenes';
import { getSceneByUserRole } from '../utils/get-scene-by-role';

@Update()
export class AppUpdate {
  constructor(
    private readonly trongridService: TrongridService,
    private readonly usersService: UsersService,
  ) {}

  @Start()
  async start(ctx: SceneContext) {
    if (!ctx.message?.from) return ctx.reply('Не удалось найти пользователя');
    const { id, username } = ctx.message?.from;
    if (!id) return ctx.reply('Не удалось найти пользователя');
    let user = await this.usersService.getUserByTelegramId(id);
    if (!user)
      user = await this.usersService.createUser({
        telegramUser: { id, username },
      });
    ctx.scene.enter(getSceneByUserRole(user.role));
  }

  @Help()
  async help(@Ctx() ctx: Context) {
    await ctx.reply('Send me a sticker');
  }
}

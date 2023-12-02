import { Context, Scene, SceneEnter } from 'nestjs-telegraf';
import { BotScenes } from '../../constants';
import { SceneContext } from 'telegraf/typings/scenes';

@Scene(BotScenes.guest)
export class GuestScene {
  @SceneEnter()
  async welcomeMessage(@Context() ctx: SceneContext) {
    await ctx.reply(`[${ctx.state.role}] Добро пожаловать!`, {
      reply_markup: {
        remove_keyboard: true,
      },
    });
  }
}

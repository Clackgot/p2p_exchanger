import { Context, Scene, SceneEnter } from 'nestjs-telegraf';
import { BotScenes } from '../../constants';
import { SceneContext } from 'telegraf/typings/scenes';

@Scene(BotScenes.guest)
export class GuestScene {
  constructor() {}

  @SceneEnter()
  async welcomeMessage(@Context() ctx: SceneContext) {
    return `[${ctx.state.role}] Добро пожаловать!`;
  }
}

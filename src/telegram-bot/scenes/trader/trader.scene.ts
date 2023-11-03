import { Context, Scene, SceneEnter, Hears } from 'nestjs-telegraf';
import { TrongridService } from 'src/providers/trongrid/trongrid.service';
import { UsersService } from 'src/users/users.service';
import { Scenes } from 'telegraf';
import { BotScenes } from '../../constants';
import { SceneContext } from 'telegraf/typings/scenes';
import {
  KeyboardButton,
  ReplyKeyboardMarkup,
  Update,
} from 'telegraf/typings/core/types/typegram';

enum TraderCommands {
  getMyBalance = 'Узнать баланс',
  cardsMenu = 'Карты',
}

@Scene(BotScenes.trader)
export class TraderScene {
  constructor(
    private readonly trongridService: TrongridService,
    private readonly usersService: UsersService,
  ) {}

  @SceneEnter()
  async sayHello(@Context() ctx: Scenes.SceneContext) {
    if (!ctx.message?.from) return 'Не удалось найти пользователя';

    const { id } = ctx.message?.from;
    const user = await this.usersService.getUserByTelegramId(id);

    const buttons: KeyboardButton[][] = [
      [
        { text: TraderCommands.getMyBalance },
        { text: TraderCommands.cardsMenu },
      ],
    ];
    const keyboard: ReplyKeyboardMarkup = {
      keyboard: buttons,
      resize_keyboard: true,
    };

    await ctx.reply(`[${user?.role}] Добро пожаловать!`, {
      reply_markup: keyboard,
    });
  }

  @Hears(TraderCommands.getMyBalance)
  async getMyBalance(
    @Context() ctx: SceneContext & { update: Update.CallbackQueryUpdate },
  ) {
    const id = ctx.message?.from?.id;
    if (!id) return 'Не удалось получить баланс';
    const user = await this.usersService.getUserByTelegramId(id);
    await ctx.reply(`Баланс: ${user?.balance.usdt} USDT`);
  }

  @Hears(TraderCommands.cardsMenu)
  async cardsMenu(@Context() ctx: SceneContext) {
    await ctx.scene.enter(BotScenes.traderCards);
  }
}

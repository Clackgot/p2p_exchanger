import { Context, Scene, SceneEnter, Hears } from 'nestjs-telegraf';
import { TrongridService } from 'src/providers/trongrid/trongrid.service';
import { UsersService } from 'src/users/users.service';
import { Scenes } from 'telegraf';
import { BotScenes } from '../../constants';
import { SceneContext } from 'telegraf/typings/scenes';
import {
  InlineKeyboardMarkup,
  KeyboardButton,
  ReplyKeyboardMarkup,
  Update,
} from 'telegraf/typings/core/types/typegram';

enum TraderCardsCommands {
  getCards = 'Список карт',
  addCard = 'Добавить карту',
  removeCard = 'Удалить карту',
  updateCard = 'Изменить карту',
  back = 'Назад',
}

@Scene(BotScenes.traderCards)
export class TraderCardsScene {
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
        { text: TraderCardsCommands.getCards },
        { text: TraderCardsCommands.addCard },
      ],
      [
        { text: TraderCardsCommands.removeCard },
        { text: TraderCardsCommands.updateCard },
      ],
      [{ text: TraderCardsCommands.back }],
    ];
    const keyboard: ReplyKeyboardMarkup = {
      keyboard: buttons,
      resize_keyboard: true,
    };
    await ctx.reply('Ваши карты', { reply_markup: keyboard });
  }

  @Hears(TraderCardsCommands.getCards)
  async getCards(
    @Context() ctx: SceneContext & { update: Update.CallbackQueryUpdate },
  ) {
    await ctx.reply('Список карт');
  }

  @Hears(TraderCardsCommands.addCard)
  async addCard(
    @Context() ctx: SceneContext & { update: Update.CallbackQueryUpdate },
  ) {
    await ctx.reply('Добавление карты');
  }

  @Hears(TraderCardsCommands.removeCard)
  async removeCard(
    @Context() ctx: SceneContext & { update: Update.CallbackQueryUpdate },
  ) {
    await ctx.reply('Удаление карты');
  }

  @Hears(TraderCardsCommands.updateCard)
  async updateCard(
    @Context() ctx: SceneContext & { update: Update.CallbackQueryUpdate },
  ) {
    await ctx.reply('Обновление карты');
  }

  @Hears(TraderCardsCommands.back)
  async back(
    @Context() ctx: SceneContext & { update: Update.CallbackQueryUpdate },
  ) {
    await ctx.scene.enter(BotScenes.trader);
  }
}

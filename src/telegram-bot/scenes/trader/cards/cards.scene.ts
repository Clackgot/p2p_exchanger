import { Context, Scene, SceneEnter, Hears, Action } from 'nestjs-telegraf';
import { UsersService } from 'src/users/users.service';
import { Scenes } from 'telegraf';
import { BotScenes } from '../../../constants';
import { SceneContext } from 'telegraf/typings/scenes';
import {
  InlineKeyboardButton,
  InlineKeyboardMarkup,
  KeyboardButton,
  ReplyKeyboardMarkup,
} from 'telegraf/typings/core/types/typegram';
import { CardsService } from 'src/cards/cards.service';
import { Logger } from '@nestjs/common';

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
    private readonly cardsService: CardsService,
    private readonly usersService: UsersService,
  ) {}
  private logger: Logger = new Logger(this.constructor.name);

  @SceneEnter()
  async sayHello(@Context() ctx: Scenes.SceneContext) {
    this.logger.log(
      `${ctx.message?.from.id} перешёл на сцену ${BotScenes.traderCards}`,
    );
    if (!ctx.message?.from) return 'Не удалось найти пользователя';

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
  async getCards(@Context() ctx: SceneContext) {
    if (!ctx.message?.from) return 'Не удалось найти пользователя';

    const { id } = ctx.message?.from;
    const user = await this.usersService.getUserByTelegramId(id);
    const cards = user!.bankCards.slice(0, 33);
    const buttons: InlineKeyboardButton[][] = cards.map<InlineKeyboardButton[]>(
      (card) => [
        { text: card.id.padStart(16, '0'), callback_data: `card${card.id}` },
        { text: 'Изменить', callback_data: `card${card.id}` },
        { text: 'Удалить', callback_data: `card${card.id}` },
      ],
    );
    const keyboard: InlineKeyboardMarkup = {
      inline_keyboard: buttons,
    };
    await ctx.reply(`У вас ${cards.length} карт`, { reply_markup: keyboard });
  }

  @Hears(TraderCardsCommands.addCard)
  async addCard(@Context() ctx: SceneContext) {
    if (!ctx.message?.from) return 'Не удалось найти пользователя';
    await ctx.scene.enter(BotScenes.addCard);
  }

  @Hears(TraderCardsCommands.removeCard)
  async removeCard(@Context() ctx: SceneContext) {
    await ctx.reply('Удаление карты');
  }

  @Hears(TraderCardsCommands.updateCard)
  async updateCard(@Context() ctx: SceneContext) {
    await ctx.reply('Обновление карты');
  }

  @Hears(TraderCardsCommands.back)
  async leave(@Context() ctx: SceneContext) {
    await ctx.scene.enter(BotScenes.trader);
  }

  @Action(/card[0-9]{16}/)
  async action(
    @Context()
    ctx: SceneContext & {
      update: {
        callback_query: {
          data: string;
        };
      };
    },
  ) {
    const data = ctx?.update?.callback_query?.data;
    await ctx.answerCbQuery(data.slice(4));
  }
}

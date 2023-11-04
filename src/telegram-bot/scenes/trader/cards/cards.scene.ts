import { Context, Scene, SceneEnter, Hears, SceneLeave } from 'nestjs-telegraf';
import { TrongridService } from 'src/providers/trongrid/trongrid.service';
import { UsersService } from 'src/users/users.service';
import { Scenes } from 'telegraf';
import { BotScenes } from '../../../constants';
import { SceneContext } from 'telegraf/typings/scenes';
import {
  KeyboardButton,
  ReplyKeyboardMarkup,
  Update,
} from 'telegraf/typings/core/types/typegram';
import { CardsService } from 'src/cards/cards.service';

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

  @SceneEnter()
  async sayHello(@Context() ctx: Scenes.SceneContext) {
    console.log(BotScenes.traderCards);

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
  async getCards(@Context() ctx: SceneContext) {
    if (!ctx.message?.from) return 'Не удалось найти пользователя';

    const { id } = ctx.message?.from;
    const user = await this.usersService.getUserByTelegramId(id);
    await ctx.reply(`У вас ${user?.bankCards?.length || 0} карт`);
  }

  @Hears(TraderCardsCommands.addCard)
  async addCard(@Context() ctx: SceneContext) {
    if (!ctx.message?.from) return 'Не удалось найти пользователя';
    const { id } = ctx.message?.from;
    const user = await this.usersService.getUserByTelegramId(id);
    // TODO: Добавить создание карты
    //this.cardsService.createCard();
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
}

import {
  Context,
  SceneEnter,
  Hears,
  Wizard,
  WizardStep,
  Ctx,
  Message,
} from 'nestjs-telegraf';
import { UsersService } from 'src/users/users.service';
import { BotScenes } from '../../../constants';
import { WizardContext } from 'telegraf/typings/scenes';
import {
  KeyboardButton,
  ReplyKeyboardMarkup,
} from 'telegraf/typings/core/types/typegram';
import { CardsService } from 'src/cards/cards.service';
import { UserMessage } from 'src/telegram-bot/types/message.type';
import { isValidCardNumber } from 'src/shared/utils/is-valid-card-number.util';

enum AddCardCommands {
  back = 'Назад',
}
@Wizard(BotScenes.addCard)
export class AddCardScene {
  constructor(
    private readonly cardsService: CardsService,
    private readonly usersService: UsersService,
  ) {}

  @SceneEnter()
  async showMenu(@Context() ctx: WizardContext) {
    console.log(BotScenes.addCard);
    const buttons: KeyboardButton[][] = [[{ text: AddCardCommands.back }]];
    const keyboard: ReplyKeyboardMarkup = {
      keyboard: buttons,
      resize_keyboard: true,
    };
    await ctx.reply('Отправьте номер карты', { reply_markup: keyboard });
  }

  @WizardStep(0)
  async getCardNumber(
    @Ctx()
    ctx: WizardContext,
    @Message() message: UserMessage,
  ) {
    if (isValidCardNumber(message?.text)) {
      await ctx.reply('Карта добавлена');
      await this.leave(ctx);
    } else {
      await ctx.reply('Неверный формат карты. Попробуйте ещё раз');
      return;
    }
  }

  @Hears(AddCardCommands.back)
  async back(@Context() ctx: WizardContext) {
    await this.leave(ctx);
  }

  async leave(@Context() ctx: WizardContext) {
    await ctx.scene.enter(BotScenes.traderCards);
  }
}

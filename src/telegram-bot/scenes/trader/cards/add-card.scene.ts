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
import { Logger } from '@nestjs/common';

enum AddCardCommands {
  back = 'Назад',
}
@Wizard(BotScenes.addCard)
export class AddCardScene {
  constructor(
    private readonly cardsService: CardsService,
    private readonly usersService: UsersService,
  ) {}
  private logger: Logger = new Logger(this.constructor.name);
  @SceneEnter()
  async showMenu(@Context() ctx: WizardContext) {
    this.logger.log(
      `${ctx.message?.from.id} перешёл на сцену ${BotScenes.addCard}`,
    );
    const buttons: KeyboardButton[][] = [[{ text: AddCardCommands.back }]];
    const keyboard: ReplyKeyboardMarkup = {
      keyboard: buttons,
      resize_keyboard: true,
    };
    await ctx.reply('Отправьте номер карты', { reply_markup: keyboard });
  }

  @WizardStep(0)
  async enterCardNumber(
    @Ctx()
    ctx: WizardContext,
    @Message() message: UserMessage,
  ) {
    if (isValidCardNumber(message?.text)) {
      await ctx.reply('Отправьте имя держателя карты');
      ctx.wizard.next();
    } else {
      await ctx.reply('Неверный формат карты. Попробуйте ещё раз');
      return;
    }
  }

  @WizardStep(1)
  async enterCardHolder(
    @Ctx()
    ctx: WizardContext,
    @Message() message: UserMessage,
  ) {
    if (message?.text && message?.text?.length > 2) {
      await ctx.reply('Карта добавлена');
      await this.leave(ctx);
    } else {
      await ctx.reply('Неверное имя держателя карты. Попробуйте ещё раз');
      return;
    }
  }

  @Hears(AddCardCommands.back)
  async back(@Context() ctx: WizardContext) {
    await this.leave(ctx);
  }

  async leave(@Context() ctx: WizardContext) {
    return ctx.scene.enter(BotScenes.traderCards);
  }
}

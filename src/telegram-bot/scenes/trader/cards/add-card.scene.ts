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
import { WizardContext, WizardSessionData } from 'telegraf/typings/scenes';
import {
  KeyboardButton,
  ReplyKeyboardMarkup,
} from 'telegraf/typings/core/types/typegram';
import { CardsService } from 'src/cards/cards.service';
import { UserMessage } from 'src/telegram-bot/types/message.type';
import { isValidCardNumber } from 'src/shared/utils/is-valid-card-number.util';
import { Logger, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { BankCard } from 'src/models/bank-card.model';
import { getCreatedCardNumberMessage } from './utils/messages';

enum AddCardCommands {
  back = 'Назад',
}
type AddCardSessionData = WizardSessionData & {
  state: { card: CreateCardDto };
};
type AddCardContext = WizardContext<AddCardSessionData>;

@Wizard(BotScenes.addCard)
export class AddCardScene {
  constructor(
    private readonly cardsService: CardsService,
    private readonly usersService: UsersService,
  ) {}
  private logger: Logger = new Logger(this.constructor.name);

  @SceneEnter()
  async showMenu(@Context() ctx: AddCardContext) {
    this.logger.log(
      `${ctx.message?.from.id} перешёл на сцену ${BotScenes.addCard}`,
    );
    const buttons: KeyboardButton[][] = [[{ text: AddCardCommands.back }]];
    const keyboard: ReplyKeyboardMarkup = {
      keyboard: buttons,
      resize_keyboard: true,
    };
    ctx.scene.session.state.card = new BankCard();
    await ctx.reply('Отправьте номер карты', { reply_markup: keyboard });
  }

  @WizardStep(0)
  async enterCardNumber(
    @Ctx()
    ctx: AddCardContext,
    @Message() message: UserMessage,
  ) {
    if (isValidCardNumber(message?.text)) {
      ctx.scene.session.state.card.id = message?.text;

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
    ctx: AddCardContext,
    @Message() message: UserMessage,
  ) {
    try {
      if (message?.text && message?.text?.length > 2) {
        ctx.scene.session.state.card.holder = message.text;
        const userId = ctx.message?.from?.id;
        if (!userId) {
          throw new NotFoundException(
            'Не удалось найти пользователя в enterCardHolder',
          );
        }
        const owner = await this.usersService.getUserByTelegramId(userId);
        if (!owner) {
          throw new NotFoundException(
            'Не удалось найти пользователя в enterCardHolder',
          );
        }
        ctx.scene.session.state.card.owner = owner;
        const cardDto = ctx.scene.session.state.card;
        const card = await this.cardsService.createCard(cardDto);
        const replyMessage = getCreatedCardNumberMessage(card);
        await ctx.reply(replyMessage, {
          parse_mode: 'HTML',
        });
        await this.leave(ctx);
      } else {
        await ctx.reply('Неверное имя держателя карты. Попробуйте ещё раз');
        return;
      }
    } catch (err) {
      await ctx.reply(err.message);
      await this.leave(ctx);
    }
  }

  @Hears(AddCardCommands.back)
  async back(@Context() ctx: AddCardContext) {
    await this.leave(ctx);
  }

  async leave(@Context() ctx: AddCardContext) {
    return ctx.scene.enter(BotScenes.traderCards);
  }
}

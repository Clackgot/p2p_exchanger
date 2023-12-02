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
import { Logger, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { BankCard } from 'src/models/bank-card.model';
import { displayCardMessage } from './utils/messages';
import { parseCardNumber } from './utils/parse-card';

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
    await ctx.reply(
      'Отправьте номер карты в формате:\n<code>4850786244873854 Eden Sawicki</code>',
      { reply_markup: keyboard, parse_mode: 'HTML' },
    );
  }

  @WizardStep(0)
  async enterCard(
    @Ctx()
    ctx: AddCardContext,
    @Message() message: UserMessage,
  ) {
    try {
      const userId = ctx.message?.from?.id;
      if (!userId) {
        throw new NotFoundException('Не удалось найти пользователя');
      }
      const owner = await this.usersService.getUserByTelegramId(userId);
      if (!owner) {
        throw new NotFoundException('Не удалось найти пользователя');
      }
      const cardDto = parseCardNumber(message.text);

      const card = await this.cardsService.createCard({ ...cardDto, owner });
      const replyMessage = displayCardMessage(card);
      await ctx.reply(replyMessage, {
        parse_mode: 'HTML',
      });
      await ctx.scene.enter(BotScenes.traderCards);
    } catch (error) {
      await Promise.all([
        ctx.reply(error.message),
        ctx.scene.enter(BotScenes.traderCards),
      ]);
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

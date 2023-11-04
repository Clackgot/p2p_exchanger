import {
  Context,
  Scene,
  SceneEnter,
  Hears,
  Wizard,
  WizardStep,
  Ctx,
  Message,
} from 'nestjs-telegraf';
import { TrongridService } from 'src/providers/trongrid/trongrid.service';
import { UsersService } from 'src/users/users.service';
import { BotScenes } from '../../../constants';
import { SceneContext, WizardContext } from 'telegraf/typings/scenes';
import {
  KeyboardButton,
  ReplyKeyboardMarkup,
  ServiceMessageBundle,
  Update,
} from 'telegraf/typings/core/types/typegram';
import { CardsService } from 'src/cards/cards.service';
import { UserMessage } from 'src/telegram-bot/types/message.type';
import { IsNumber } from 'class-validator';

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
    console.log('AddCardScene');
  }

  @WizardStep(0)
  async requestFirstNumber(
    @Ctx()
    ctx: WizardContext,
    @Message() message: UserMessage,
  ) {
    console.log('requestFirstNumber');
    await ctx.reply(`Введите первое число`);
    ctx.wizard.next();
  }
  @WizardStep(1)
  async readFirstNumber(
    @Context() ctx: WizardContext,
    @Message() message: UserMessage,
  ) {
    console.log('readFirstNumber');

    if (!isNaN(+message.text)) {
      await ctx.reply('Карта добавлена');
      await ctx.scene.leave();
    } else {
      ctx.wizard.back();
    }
  }
  //   @WizardStep(2)
  //   async addCard(
  //     @Context() ctx: WizardContext & { update: Update.CallbackQueryUpdate },
  //   ) {
  //     if (!ctx.message?.from) return 'Не удалось найти пользователя';

  //     const { id } = ctx.message?.from;
  //     const user = await this.usersService.getUserByTelegramId(id);
  //     // TODO: Добавить создание карты
  //     //this.cardsService.createCard();
  //     await ctx.reply('Добавление карты');
  //   }
  //   @WizardStep(3)
  //   async removeCard(
  //     @Context() ctx: WizardContext & { update: Update.CallbackQueryUpdate },
  //   ) {
  //     await ctx.reply('Удаление карты');
  //   }
  //   @WizardStep(4)
  //   async updateCard(
  //     @Context() ctx: WizardContext & { update: Update.CallbackQueryUpdate },
  //   ) {
  //     await ctx.reply('Обновление карты');
  //   }
  @Hears(AddCardCommands.back)
  async back(
    @Context() ctx: WizardContext & { update: Update.CallbackQueryUpdate },
  ) {
    await ctx.scene.leave();
  }
}

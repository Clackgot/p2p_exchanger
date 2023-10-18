import { Injectable } from '@nestjs/common';
import applicationConstants from 'src/config/applicationConstants';
import { TrongridService } from 'src/providers/trongrid/trongrid.service';
import { Bot, Context, SessionFlavor, session } from 'grammy';
import {
  ScenesSessionData,
  ScenesFlavor,
  ScenesComposer,
  Scene,
} from 'grammy-scenes';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/models/user.model';
import { TelegramUser } from 'src/models/telegram-user.model';

type SessionData = ScenesSessionData & {
  // Your own global session interface, could be empty as well.
};

export type BotContext = Context & SessionFlavor<SessionData> & ScenesFlavor;

@Injectable()
export class TelegramBotService {
  constructor(
    private readonly trongridService: TrongridService,
    private readonly usersService: UsersService,
  ) {
    this.init();
  }

  private scenes = new ScenesComposer<BotContext>();

  private bot = new Bot(applicationConstants.TELEGRAM.TELEGRAM_BOT_TOKEN);
  async init() {
    this.bot.use(
      session({
        initial: () => ({}),
      }),
    );
    const mainScene = new Scene<BotContext>('main');
    mainScene.step(async (ctx) => {
      const identifier: number = ctx.from!.id!;
      const username: string = ctx.from!.username!;
      let user: User | null = await this.usersService.getUserByTelegramId(
        identifier,
      );
      const telegramUser = new TelegramUser();
      telegramUser.identifier = identifier;
      telegramUser.username = username;
      if (!user) {
        user = await this.usersService.createUser({
          telegramUser,
        });
      }
      await ctx.reply(`Добро пожаловать, ${user?.telegramUser.username}`);
    });
    mainScene.step(async (ctx) => {
      await ctx.reply('Enter your name:');
    });

    // As the flow comes to wait(), the execution will stop.
    // Next Telegram updates will be passed to the inner middleware.
    // The inner middleware should call ctx.scene.resume() to proceed to the next scene step.
    // Make sure to use unique label in each wait() block.
    mainScene.wait('name').on('message:text', async (ctx) => {
      const name = ctx.message.text;
      if (name.toLowerCase() === 'john') {
        await ctx.reply(`Welcome, ${name}!`);
        // Proceed to the next step.
        ctx.scene.resume();
      } else {
        await ctx.reply(`${name}, your are not welcome here.`);
        // Keep the execution in the current wait() block.
      }
    });

    // Add more steps...
    mainScene.step(async (ctx) => {
      await ctx.reply('Proceeding...');
    });

    // Mark position in the scene to be able to jump to it (see below).
    mainScene.label('start');

    // A scene may unconditionally call a nested scene.
    // See sample captcha implementation below.
    mainScene.call('captcha');

    // Please add step label for the first step after call()
    mainScene.label('after_captcha').step(async (ctx) => {
      await ctx.reply(`Please choose:`, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Start over', callback_data: 'start' },
              { text: 'Add item', callback_data: 'add_item' },
              { text: 'Exit', callback_data: 'exit' },
            ],
          ],
        },
      });
    });

    mainScene.wait('menu').on('callback_query:data', async (ctx) => {
      await ctx.answerCallbackQuery();
      const choice = ctx.callbackQuery.data;
      if (choice === 'start') {
        // Jump to the label marked above.
        ctx.scene.goto('start');
      } else if (choice === 'add_item') {
        // Conditionally call a nested scene.
        // Implies automatic resume after the nested scene completes.
        ctx.scene.call('add_item');
      } else if (choice === 'exit') {
        // Exit scene, don't call next middleware.
        ctx.scene.exit();
      }
    });

    mainScene.step((ctx) => ctx.reply(`Main scene finished`));

    this.scenes.scene(mainScene);
    this.bot.use(this.scenes.manager());

    // this.bot.on('message:text', (ctx) =>
    //   ctx.reply(`Echo: ${ctx.message.text}`),
    // );

    this.bot.command('start', async (ctx: any) => {
      await ctx.reply(`Welcome here.`);
      await ctx.scenes.enter('main');
    });

    this.bot.start();
  }
}

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
import { User, UserRole } from 'src/models/user.model';
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
      switch (user.role) {
        case UserRole.admin:
          ctx.scene.enter('admin');
          break;
        case UserRole.merchant:
          ctx.scene.enter('merchant');
          break;
        case UserRole.trader:
          ctx.scene.enter('trader');
          break;
        case UserRole.guest:
          ctx.scene.enter('guest');
          break;
      }
      await ctx.reply(`Добро пожаловать, ${user?.telegramUser.username}`);
    });

    const adminScene = new Scene<BotContext>('admin');
    adminScene.label('admin');
    adminScene.step(async (ctx) => {
      await ctx.reply('admin');
    });

    const merchantScene = new Scene<BotContext>('merchant');
    merchantScene.step(async (ctx) => {
      await ctx.reply('merchant');
    });
    const traderScene = new Scene<BotContext>('trader');
    traderScene.step(async (ctx) => {
      await ctx.reply('trader');
    });
    const guestScene = new Scene<BotContext>('guest');
    guestScene.step(async (ctx) => {
      await ctx.reply('guest');
    });

    const scenes = new ScenesComposer<BotContext>(
      mainScene,
      adminScene,
      merchantScene,
      traderScene,
      guestScene,
    );
    this.bot.use(scenes.manager());
    // this.bot.use(scenes);

    // this.bot.on('message:text', (ctx) =>
    //   ctx.reply(`Echo: ${ctx.message.text}`),
    // );

    this.bot.command('start', async (ctx: any) => {
      await ctx.scenes.enter('main');
    });

    this.bot.start();
  }
}

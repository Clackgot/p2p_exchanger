import { Injectable } from '@nestjs/common';
import applicationConstants from 'src/config/applicationConstants';
import { TrongridService } from 'src/providers/trongrid/trongrid.service';
import { Bot, session } from 'grammy';
import { ScenesComposer, Scene } from 'grammy-scenes';

import { UsersService } from 'src/users/users.service';
import { User, UserRole } from 'src/models/user.model';
import { TelegramUser } from 'src/models/telegram-user.model';
import { BotScenes } from './constants';
import { BotContext } from './types';

@Injectable()
export class TelegramBotService {
  constructor(
    private readonly trongridService: TrongridService,
    private readonly usersService: UsersService,
  ) {
    this.init();
  }

  private bot = new Bot(applicationConstants.TELEGRAM.TELEGRAM_BOT_TOKEN);

  adminMainScene(): Scene<BotContext, undefined> {
    const adminScene = new Scene<BotContext>(BotScenes.admin);
    adminScene.label(BotScenes.admin);
    adminScene.step(async (ctx) => {
      const identifier: number = ctx.from!.id!;
      const user: User | null = await this.usersService.getUserByTelegramId(
        identifier,
      );
      await ctx.reply(
        `[admin] Добро пожаловать, ${user?.telegramUser.username}`,
      );
    });
    return adminScene;
  }

  merchantMainScene(): Scene<BotContext, undefined> {
    const merchantScene = new Scene<BotContext>(BotScenes.merchant);
    merchantScene.step(async (ctx) => {
      const identifier: number = ctx.from!.id!;
      const user: User | null = await this.usersService.getUserByTelegramId(
        identifier,
      );
      await ctx.reply(
        `[merchant] Добро пожаловать, ${user?.telegramUser.username}`,
      );
    });
    return merchantScene;
  }

  traderMainScene(): Scene<BotContext, undefined> {
    const traderScene = new Scene<BotContext>(BotScenes.trader);
    traderScene.step(async (ctx) => {
      const identifier: number = ctx.from!.id!;
      const user: User | null = await this.usersService.getUserByTelegramId(
        identifier,
      );
      await ctx.reply(
        `[trader] Добро пожаловать, ${user?.telegramUser.username}`,
      );
    });
    return traderScene;
  }

  guestMainScene(): Scene<BotContext, undefined> {
    const guestScene = new Scene<BotContext>(BotScenes.guest);
    guestScene.step(async (ctx) => {
      const identifier: number = ctx.from!.id!;
      const user: User | null = await this.usersService.getUserByTelegramId(
        identifier,
      );
      await ctx.reply(
        `[guest] Добро пожаловать, ${user?.telegramUser.username}`,
      );
    });
    return guestScene;
  }

  mainScene(): Scene<BotContext, undefined> {
    const mainScene = new Scene<BotContext>(BotScenes.main);
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
          ctx.scene.enter(BotScenes.admin);
          break;
        case UserRole.merchant:
          ctx.scene.enter(BotScenes.merchant);
          break;
        case UserRole.trader:
          ctx.scene.enter(BotScenes.trader);
          break;
        case UserRole.guest:
          ctx.scene.enter(BotScenes.guest);
          break;
      }
    });
    return mainScene;
  }

  async init() {
    this.bot.use(
      session({
        initial: () => ({}),
      }),
    );

    const scenes = new ScenesComposer<BotContext>(
      this.mainScene(),
      this.adminMainScene(),
      this.merchantMainScene(),
      this.traderMainScene(),
      this.guestMainScene(),
    );
    this.bot.use(scenes.manager());
    // this.bot.use(scenes);

    // this.bot.on('message:text', (ctx) =>
    //   ctx.reply(`Echo: ${ctx.message.text}`),
    // );

    this.bot.command('start', async (ctx: any) => {
      await ctx.scenes.enter(BotScenes.main);
    });

    this.bot.start();
  }
}

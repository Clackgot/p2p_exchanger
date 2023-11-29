import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { TelegrafModuleOptions, TelegrafOptionsFactory } from 'nestjs-telegraf';
import applicationConstants from 'src/config/applicationConstants';

import { UsersService } from 'src/users/users.service';
import { SessionStore, session } from 'telegraf';
import { Redis } from '@telegraf/session/redis';

@Injectable()
export class TelegrafConfigurator implements TelegrafOptionsFactory {
  readonly store: SessionStore<any>;
  constructor(private readonly usersService: UsersService) {
    this.store = this.configureRedisStore();
  }
  private logger: Logger = new Logger(this.constructor.name);

  private setUserRoleMiddleware = async (ctx: any, next: any) => {
    try {
      const telegramId =
        ctx?.message?.from?.id || ctx?.update?.callback_query?.from?.id;
      const username =
        ctx?.message?.from?.username ||
        ctx?.update?.callback_query?.from?.username;

      if (!telegramId) throw new NotFoundException('Не удалось получить ID');

      const isTelegramUserExists = await this.usersService.isTelegramUserExists(
        telegramId,
      );
      if (!isTelegramUserExists) {
        const user = await this.usersService.createUserByTelegram({
          telegramId,
          username,
        });
        ctx.state.role = user.role;
        console.log(ctx.state.role);
      } else {
        const user = await this.usersService.getUserByTelegramId(telegramId);
        ctx.state.role = user.role;
        console.log(ctx.state.role);
      }
      await next();
    } catch (error) {
      this.logger.error(
        `Произошла ошибка в setUserRoleMiddleware: ${error.message}`,
      );
      console.log(error);
      ctx?.reply('Произошла неизвестная ошибка');
      ctx?.scene?.leave();
    }
  };

  private loggerMiddleware = async (ctx: any, next: any) => {
    try {
      const id = ctx.message?.from?.id || ctx?.update?.callback_query?.from?.id;
      const username =
        ctx.message?.from?.username ||
        ctx?.update?.callback_query?.from?.username;
      const message = this.getMessageByType(ctx);
      this.logger.verbose(`${username || id}: ${message}`);
      await next();
    } catch (error) {
      this.logger.error(
        `Произошла ошибка в loggerMiddleware: ${error.message}`,
      );
      ctx?.reply('Произошла неизвестная ошибка');
      ctx?.scene?.leave();
    }
  };

  private getMessageByType(ctx: any): string {
    if (ctx?.update?.callback_query) return '[Нажата кнопка]';
    const { message } = ctx;
    const handlers: Record<string, string> = {
      text: message?.text || '[Не определено]',
      video_note: '[Кружок]',
      animation: '[Гифка]',
      voice: '[Голосовое сообщение]',
      document: '[Файл]',
      photo: '[Изображение]',
      location: '[Геолокация]',
      poll: '[Опрос]',
      audio: '[Аудио]',
      contact: '[Контакт]',
      video: '[Видео]',
      sticker: '[Стикер]',
      default: '[Не определено]',
    };
    const messageType =
      Object.keys(handlers).find((key) => message?.[key]) || 'default';

    return handlers[messageType];
  }

  private configureRedisStore(): SessionStore<any> {
    return Redis({
      url: `redis://${applicationConstants.REDIS.HOST}:${applicationConstants.REDIS.PORT}`,
      config: {
        password: applicationConstants.REDIS.PASSWORD,
      },
    });
  }

  public createTelegrafOptions(): TelegrafModuleOptions {
    return {
      token: applicationConstants.TELEGRAM.TOKEN,
      middlewares: [
        session(),
        this.setUserRoleMiddleware.bind(this),
        this.loggerMiddleware,
      ],
    };
  }
}

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { TelegrafModuleOptions, TelegrafOptionsFactory } from 'nestjs-telegraf';
import applicationConstants from 'src/config/applicationConstants';

import { UsersService } from 'src/users/users.service';
import { SessionStore, session } from 'telegraf';
import { WizardContext } from 'telegraf/typings/scenes';
import { Redis } from '@telegraf/session/redis';

@Injectable()
export class TelegrafConfigurator implements TelegrafOptionsFactory {
  readonly store: SessionStore<any>;
  constructor(private readonly usersService: UsersService) {
    this.store = this.configureRedisStore();
  }
  private logger: Logger = new Logger(this.constructor.name);

  private setUserRoleMiddleware = async (ctx: WizardContext, next: any) => {
    try {
      const id = ctx.message?.from.id;
      if (!id) throw new NotFoundException('Не удалось получить ID');
      const user = await this.usersService.getUserByTelegramId(id);
      if (!user) throw new NotFoundException('Не удалось найти пользователя');
      ctx.state.role = user.role;
      await next();
    } catch (error) {
      this.logger.error(
        `Произошла ошибка в setUserRoleMiddleware: ${error.message}`,
      );
      throw error;
    }
  };

  private loggerMiddleware = async (ctx: any, next: any) => {
    try {
      const message = this.getMessageByType(ctx.message);
      this.logger.verbose(`${ctx.message?.from.id}: ${message}`);
      await next();
    } catch (error) {
      this.logger.error(
        `Произошла ошибка в loggerMiddleware: ${error.message}`,
      );
      throw error;
    }
  };

  private getMessageByType(message: any): string {
    const handlers: Record<string, string> = {
      text: message.text || '[Не определено]',
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
        session({ store: this.store }),
        this.setUserRoleMiddleware.bind(this),
        this.loggerMiddleware,
      ],
    };
  }
}

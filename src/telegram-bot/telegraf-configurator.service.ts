import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { TelegrafModuleOptions, TelegrafOptionsFactory } from 'nestjs-telegraf';
import applicationConstants from 'src/config/applicationConstants';
import { TrongridService } from 'src/providers/trongrid/trongrid.service';

import { UsersService } from 'src/users/users.service';
import { session } from 'telegraf';
import { WizardContext, WizardSessionData } from 'telegraf/typings/scenes';

@Injectable()
export class TelegrafConfigurator implements TelegrafOptionsFactory {
  constructor(private readonly usersService: UsersService) {}
  private logger: Logger = new Logger(this.constructor.name);
  private async setUserRoleMiddleware(ctx: WizardContext, next: any) {
    const id = ctx.message?.from.id;
    if (!id) throw new NotFoundException('Не удалось получить ID');
    const user = await this.usersService.getUserByTelegramId(id);
    if (!user) throw new NotFoundException('Не удалось найти пользователя');
    ctx.state.role = user.role;
    await next();
  }

  private async loggerMiddleware(ctx: any, next: any) {
    const message = this.getMessageByType(ctx.message);
    this.logger.verbose(`${ctx.message?.from.id}: ${message}`);
    await next();
  }

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
    console.log(message);
    const messageType =
      Object.keys(handlers).find((key) => message?.[key]) || 'default';

    return handlers[messageType];
  }

  public createTelegrafOptions(): TelegrafModuleOptions {
    return {
      token: applicationConstants.TELEGRAM.TELEGRAM_BOT_TOKEN,
      middlewares: [
        session(),
        this.setUserRoleMiddleware.bind(this),
        this.loggerMiddleware.bind(this),
      ],
    };
  }
}

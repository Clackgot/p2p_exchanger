import { Injectable, NotFoundException } from '@nestjs/common';
import { TelegrafModuleOptions, TelegrafOptionsFactory } from 'nestjs-telegraf';
import applicationConstants from 'src/config/applicationConstants';
import { TrongridService } from 'src/providers/trongrid/trongrid.service';

import { UsersService } from 'src/users/users.service';
import { session } from 'telegraf';
import { WizardContext, WizardSessionData } from 'telegraf/typings/scenes';

@Injectable()
export class TelegrafConfigurator implements TelegrafOptionsFactory {
  constructor(private readonly usersService: UsersService) {}

  private async setUserRoleMiddleware(ctx: WizardContext, next: any) {
    const id = ctx.message?.from.id;
    if (!id) throw new NotFoundException('Не удалось получить ID');
    const user = await this.usersService.getUserByTelegramId(id);
    if (!user) throw new NotFoundException('Не удалось найти пользователя');
    ctx.state;
    await next();
  }

  public createTelegrafOptions(): TelegrafModuleOptions {
    return {
      token: applicationConstants.TELEGRAM.TELEGRAM_BOT_TOKEN,
      middlewares: [session(), this.setUserRoleMiddleware.bind(this)],
    };
  }
}

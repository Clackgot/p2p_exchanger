import applicationConstants from 'src/config/applicationConstants';
import { Redis } from '@telegraf/session/redis';
import { NotFoundException } from '@nestjs/common';
import { TelegrafModuleOptions } from 'nestjs-telegraf';
import { UsersService } from 'src/users/users.service';
import { session } from 'telegraf';
import { WizardContext } from 'telegraf/typings/scenes';

export enum BotScenes {
  admin = 'admin',
  merchant = 'merchant',
  trader = 'trader',
  guest = 'guest',
  traderCards = 'traderCards',
  addCard = 'addCard',
}

export const redisStore = Redis({
  url: `redis://${applicationConstants.REDIS.HOST}:${applicationConstants.REDIS.PORT}`,
  config: {
    password: applicationConstants.REDIS.PASSWORD,
  },
});

// Функция установки роли пользователя в контексте
const setUserRoleMiddleware = async (
  usersService: UsersService,
  ctx: WizardContext,
  next: any,
) => {
  const id = ctx.message?.from.id;
  if (!id) throw new NotFoundException('Не удалось получить ID');
  const user = await usersService.getUserByTelegramId(id);
  if (!user) throw new NotFoundException('Не удалось найти пользователя');
  ctx.state.role = user.role;
  await next();
};

// Отдельная функция для создания TelegrafModuleOptions
export const telegrafModuleFactory = (
  usersService: UsersService,
): TelegrafModuleOptions => {
  return {
    token: applicationConstants.TELEGRAM.TELEGRAM_BOT_TOKEN,
    middlewares: [session(), setUserRoleMiddleware.bind(null, usersService)],
  };
};

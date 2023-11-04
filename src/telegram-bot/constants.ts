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

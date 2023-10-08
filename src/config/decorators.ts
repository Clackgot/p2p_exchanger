import { Matches } from 'class-validator';
import {
  telegramBotTokenRegex,
  tronAddressRegex,
  trongridAuthKeyRegex,
  tronPrivateKeyRegex,
} from './regexp';

export function IsTrongridAuthKey(): PropertyDecorator {
  return function (target: object, propertyKey: string | symbol): void {
    Matches(trongridAuthKeyRegex, {
      message: 'Неверный формат токена',
      always: true,
    })(target, propertyKey);
  };
}

export function IsTronAddress(): PropertyDecorator {
  return function (target: object, propertyKey: string | symbol): void {
    Matches(tronAddressRegex, {
      message: 'Неверный формат TRON адреса',
      always: true,
    })(target, propertyKey);
  };
}

export function IsTronPrivateKey(): PropertyDecorator {
  return function (target: object, propertyKey: string | symbol): void {
    Matches(tronPrivateKeyRegex, {
      message: 'Неверный формат приватного ключа',
      always: true,
    })(target, propertyKey);
  };
}

export function IsTelegramBotToken(): PropertyDecorator {
  return function (target: object, propertyKey: string | symbol): void {
    Matches(telegramBotTokenRegex, {
      message: 'Неверный формат Telegram токена',
      always: true,
    })(target, propertyKey);
  };
}

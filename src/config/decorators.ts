import { Matches } from 'class-validator';
import { tronAddressRegex, trongridAuthKeyRegex } from './regexp';

export function IsTrongridAuthKey(): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol): void {
    Matches(trongridAuthKeyRegex, {
      message: 'Неверный формат токена',
      always: true,
    })(target, propertyKey);
  };
}

export function IsTronAddress(): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol): void {
    Matches(tronAddressRegex, {
      message: 'Неверный формат TRON адреса',
      always: true,
    })(target, propertyKey);
  };
}

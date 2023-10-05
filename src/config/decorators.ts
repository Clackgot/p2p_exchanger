import { Matches } from 'class-validator';
import { trongridAuthKeyRegex } from './regexp';

export function IsTrongridAuthKey(): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol): void {
    Matches(trongridAuthKeyRegex, {
      message: 'Неверный формат токена',
      always: true,
    })(target, propertyKey);
  };
}

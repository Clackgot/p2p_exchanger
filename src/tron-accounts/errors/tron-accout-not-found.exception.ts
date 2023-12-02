import { HttpStatus } from '@nestjs/common';
import { TronAccountException } from './base/tron-account-exception';

export class TronAccountNotFoundException extends TronAccountException {
  constructor(address: string) {
    super(`Аккаунт ${address} не найден`, HttpStatus.NOT_FOUND);
  }
}

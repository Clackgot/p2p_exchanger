import { HttpStatus } from '@nestjs/common';
import { TronAccountException } from './base/tron-account-exception';

export class TronAccountAlreadyExistsException extends TronAccountException {
  constructor(address: string) {
    super(`Аккаунт ${address} уже существует`, HttpStatus.NOT_FOUND);
  }
}

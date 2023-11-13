import { HttpStatus } from '@nestjs/common';
import { TronObserverException } from './base/tron-observer.exception';

export class NotEnoughAdminTrxBalanceException extends TronObserverException {
  constructor() {
    super(
      `Не хватает TRX хотя бы на одном из аккаунтов администраторов`,
      HttpStatus.NOT_FOUND,
    );
  }
}

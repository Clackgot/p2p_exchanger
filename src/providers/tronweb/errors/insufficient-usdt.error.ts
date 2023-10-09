import { TronWebError } from './base.error';

export class TronWebInsufficientUSDTError extends TronWebError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

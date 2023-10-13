import { TronWebError } from './base.error';

export class TronWebContractValidateError extends TronWebError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

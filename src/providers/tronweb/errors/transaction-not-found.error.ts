import { HttpException, HttpStatus } from '@nestjs/common';

export class TransactionNotFoundException extends HttpException {
  constructor(transactionId: string) {
    super(
      {
        status: HttpStatus.NOT_FOUND,
        message: `Транзакция ${transactionId} не найдена`,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

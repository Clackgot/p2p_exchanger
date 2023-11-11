import { HttpException, HttpStatus } from '@nestjs/common';

export class TronAccountException extends HttpException {
  constructor(message?: string, status?: HttpStatus) {
    super(
      {
        status: status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: message || 'Неизвестная работа при работе с аккаунтами Tron',
      },
      status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

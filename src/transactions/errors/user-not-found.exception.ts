import { HttpException, HttpStatus } from '@nestjs/common';

export class TransactionException extends HttpException {
  constructor(message?: string, status?: HttpStatus) {
    super(
      {
        status: status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: message || 'Неизвестная работа при работе с транзакциями',
      },
      status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class UserNotFoundException extends TransactionException {
  constructor(userId: string) {
    super(`Пользователь с ID ${userId} не найден`, HttpStatus.NOT_FOUND);
  }
}

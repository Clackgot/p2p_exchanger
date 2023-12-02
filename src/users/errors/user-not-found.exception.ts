import { NotFoundException } from '@nestjs/common';
import { User } from 'src/models/user.model';

export class UserNotFoundException extends NotFoundException {
  constructor(id: string) {
    const message = `Пользователь ${id} не найден`;
    super({ message });
  }
}

export class TelegramUserNotFoundException extends NotFoundException {
  constructor(id: number) {
    const message = `Пользователь телеграм с ${id} не найден`;
    super({ message });
  }
}

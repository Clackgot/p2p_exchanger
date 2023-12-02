import { NotFoundException } from '@nestjs/common';

export class AdminsNotFoundException extends NotFoundException {
  constructor() {
    const message = `В системе нет администраторов`;
    super({ message });
  }
}

import { Injectable } from '@nestjs/common';
import { TrongridService } from 'src/providers/trongrid/trongrid.service';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class TelegramBotService {
  constructor(
    private readonly trongridService: TrongridService,
    private readonly usersService: UsersService,
  ) {}
}

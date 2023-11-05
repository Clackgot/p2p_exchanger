import { TelegramUser } from 'src/models/telegram-user.model';

export class CreateUserByTelegramDto
  implements Pick<TelegramUser, 'id' | 'username'>
{
  id: number;
  username?: string | undefined;
}

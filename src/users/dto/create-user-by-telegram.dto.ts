import { TelegramUser } from 'src/models/telegram-user.model';

export class CreateUserByTelegramDto
  implements Pick<TelegramUser, 'telegramId' | 'username'>
{
  telegramId: number;
  username?: string | undefined;
}

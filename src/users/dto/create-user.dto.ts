import { TelegramUser } from 'src/models/telegram-user.model';
import { User } from 'src/models/user.model';

export class CreateUserDto implements Pick<User, 'telegramUser'> {
  telegramUser: TelegramUser;
}

import { Balance } from 'src/models/balance.model';
import { TelegramUser } from 'src/models/telegram-user.model';
import { TronAccount } from 'src/models/tron-account.model';
import { User, UserRole } from 'src/models/user.model';

export class CreateMerchantDto
  implements
    Omit<
      User,
      'id' | 'bankCards' | 'createdDate' | 'updatedDate' | 'deletedDate'
    >
{
  telegramUser: TelegramUser;
  tronAccount: TronAccount;
  balance: Balance;
  role: UserRole;
}

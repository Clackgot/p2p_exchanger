import { BankCard } from 'src/models/bank-card.model';
import { User } from 'src/models/user.model';

export class CreateCardDto implements BankCard {
  id: string;
  holder: string;
  issuer?: string | undefined;
  owner: User;
}

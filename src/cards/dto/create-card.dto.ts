import { BankCard } from 'src/models/bank-card.model';
import { User } from 'src/models/user.model';

export class CreateCardDto
  implements Omit<BankCard, 'createdDate' | 'updatedDate'>
{
  id: string;
  holder: string;
  issuer?: string | undefined;
  owner: User;
}

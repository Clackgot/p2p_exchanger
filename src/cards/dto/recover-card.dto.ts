import { BankCard } from 'src/models/bank-card.model';

export class RecoverCardDto implements Pick<BankCard, 'id'> {
  id: string;
}

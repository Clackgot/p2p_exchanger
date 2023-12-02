import { BankCard } from 'src/models/bank-card.model';

export class RemoveCardDto implements Pick<BankCard, 'number'> {
  number: string;
}

import { Card } from './card.model';
import { TronAccount } from './tron-account.model';

export class Trader {
  id: number;
  name: string;
  cards: Card[];
  tron: TronAccount;
}

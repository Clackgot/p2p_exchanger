import { BankCard } from 'src/models/bank-card.model';

export type CreateCardDto = Omit<BankCard, 'id'>;

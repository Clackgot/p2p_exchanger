import { BankCard } from 'src/models/bank-card.model';

export class CreateCardDto implements Partial<Omit<BankCard, 'id'>> {}

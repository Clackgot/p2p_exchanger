import { Injectable } from '@nestjs/common';
import { CardsRepository } from './cards.repository';
import { GetCardsByUserIdDto } from './dto/get-cards-by-user-id.dto';
import { BankCard } from 'src/models/bank-card.model';

@Injectable()
export class CardsService {
  constructor(private readonly cardsRepository: CardsRepository) {}

  getCardsByUserId(dto: GetCardsByUserIdDto): Promise<BankCard[]> {
    return this.cardsRepository.getCardsByUserId(dto);
  }

  getAllCards(): Promise<BankCard[]> {
    return this.cardsRepository.getAllCards();
  }
}

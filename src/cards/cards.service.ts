import { Injectable } from '@nestjs/common';
import { CardsRepository } from './cards.repository';
import { GetCardsByUserIdDto } from './dto/get-cards-by-user-id.dto';
import { BankCard } from 'src/models/bank-card.model';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsService {
  constructor(private readonly cardsRepository: CardsRepository) {}

  async getCardsByUserId(dto: GetCardsByUserIdDto): Promise<BankCard[]> {
    return this.cardsRepository.getCardsByUserId(dto);
  }

  async getAllCards(): Promise<BankCard[]> {
    return this.cardsRepository.getAllCards();
  }
  async createCard(dto: CreateCardDto): Promise<BankCard> {
    return this.cardsRepository.createCard(dto);
  }
  async getCardById(id: string): Promise<BankCard> {
    return this.cardsRepository.getCardById(id);
  }
}

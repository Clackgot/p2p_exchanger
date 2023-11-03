import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import { CardsService } from './cards.service';
import { GetCardsByUserIdDto } from './dto/get-cards-by-user-id.dto';
import { BankCard } from 'src/models/bank-card.model';
import { CreateCardDto } from './dto/create-card.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  async getAllCards(): Promise<BankCard[]> {
    return this.cardsService.getAllCards();
  }

  @Get('/:id')
  async getCardsByUserId(
    @Param() dto: GetCardsByUserIdDto,
  ): Promise<BankCard[]> {
    return this.cardsService.getCardsByUserId(dto);
  }

  @Post()
  async createCard(@Body() dto: CreateCardDto): Promise<BankCard> {
    return this.cardsService.createCard(dto);
  }
}

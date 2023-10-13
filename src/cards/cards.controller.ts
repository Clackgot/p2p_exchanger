import { Controller, Param, Get } from '@nestjs/common';
import { CardsService } from './cards.service';
import { GetCardsByUserIdDto } from './dto/get-cards-by-user-id.dto';
import { BankCard } from 'src/models/bank-card.model';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  getAllCards(): Promise<BankCard[]> {
    return this.cardsService.getAllCards();
  }

  @Get('/:id')
  getCardsByUserId(@Param() dto: GetCardsByUserIdDto): Promise<BankCard[]> {
    return this.cardsService.getCardsByUserId(dto);
  }
}

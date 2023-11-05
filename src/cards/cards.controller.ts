import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { GetCardsByUserIdDto } from './dto/get-cards-by-user-id.dto';
import { BankCard } from 'src/models/bank-card.model';
import { CreateCardDto } from './dto/create-card.dto';
import { RemoveCardDto } from './dto/remove-card.dto';
import { RecoverCardDto } from './dto/recover-card.dto';

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

  @Delete('/:id')
  async removeCard(@Param() dto: RemoveCardDto): Promise<BankCard> {
    return this.cardsService.removeCard(dto);
  }
}

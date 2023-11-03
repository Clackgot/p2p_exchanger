import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankCard } from 'src/models/bank-card.model';
import { User } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { GetCardsByUserIdDto } from './dto/get-cards-by-user-id.dto';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(BankCard)
    private readonly bankCardsRepository: Repository<BankCard>,
  ) {}

  async getCardsByUserId(dto: GetCardsByUserIdDto): Promise<BankCard[]> {
    const { id } = dto;
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user)
      throw new NotFoundException(`Пользователь с ID: ${id} не найден`);
    return user?.bankCards ?? [];
  }

  async getAllCards(): Promise<BankCard[]> {
    return this.bankCardsRepository.find();
  }

  async createCard(dto: CreateCardDto): Promise<BankCard> {
    return this.bankCardsRepository.save(dto);
  }
}

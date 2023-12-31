import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BankCard } from 'src/models/bank-card.model';
import { User } from 'src/models/user.model';
import { Repository } from 'typeorm';
import { GetCardsByUserIdDto } from './dto/get-cards-by-user-id.dto';
import { CreateCardDto } from './dto/create-card.dto';
import { RemoveCardDto } from './dto/remove-card.dto';

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
    const { number } = dto;
    const exsistCard = await this.bankCardsRepository.findOne({
      where: {
        number,
      },
    });
    if (exsistCard)
      throw new ConflictException(`Карта ${number} уже существует`);
    return this.bankCardsRepository.save(dto);
  }
  async getCardById(id: string): Promise<BankCard> {
    const card = await this.bankCardsRepository.findOne({
      where: {
        id,
      },
    });
    if (!card) throw new NotFoundException(`Карта ${id} не найдена`);
    return card;
  }

  async getCardByNumber(number: string): Promise<BankCard> {
    const card = await this.bankCardsRepository.findOne({
      where: {
        number,
      },
    });
    if (!card) throw new NotFoundException(`Карта ${number} не найдена`);
    return card;
  }

  async removeCard(dto: RemoveCardDto): Promise<BankCard> {
    try {
      const { number } = dto;
      const card = await this.getCardByNumber(number);
      return this.bankCardsRepository.remove(card);
    } catch (error) {
      throw new InternalServerErrorException(
        `Не удалось удалить карту ${dto?.number}`,
      );
    }
  }
}

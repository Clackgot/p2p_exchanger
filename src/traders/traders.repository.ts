import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/models/user.model';
import { Repository } from 'typeorm';

@Injectable()
export class TradersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getTraders(): Promise<User[]> {
    return this.usersRepository.find({ where: { role: UserRole.trader } });
  }

  async getTraderById(id: string): Promise<User> {
    const trader = await this.usersRepository.findOne({
      where: { role: UserRole.trader, id },
    });
    if (!trader) throw new NotFoundException(`Трейдер с ID: ${id} не найден`);
    return trader;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { MockTradersRepository } from './traders.mock-repository';
import { Trader } from 'src/models/trader.model';

@Injectable()
export class TradersService {
  constructor(private readonly repository: MockTradersRepository) {}

  async getTraders(): Promise<Trader[]> {
    return this.repository.getTraders();
  }

  async getTraderById(id: number): Promise<Trader> {
    const trader: Trader | undefined = await this.repository.getTraderById(id);
    if (!trader) throw new NotFoundException('Трейдер с таким ID не найден');
    return trader;
  }
}

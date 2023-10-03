import { Injectable } from '@nestjs/common';
import { MockTradersRepository } from './traders.mock-repository';

@Injectable()
export class TradersService {
  constructor(private readonly repository: MockTradersRepository) {}

  async getTraders(): Promise<Trader[]> {
    return this.repository.getTraders();
  }

  async getTraderById(id: number): Promise<Trader> {
    return this.repository.getTraderById(id);
  }
}

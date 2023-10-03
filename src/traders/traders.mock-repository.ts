import { Injectable, Logger } from '@nestjs/common';
import { generateTraders } from './utils/generate-traders';

@Injectable()
export class MockTradersRepository {
  private logger = new Logger('MockTradersRepository');
  private traders: Trader[] = [];

  constructor() {
    this.traders = generateTraders({ min: 4, max: 10 });
    this.logger.debug(`Создано ${this.traders.length} тестовых трейдеров`);
  }

  async getTraders(): Promise<Trader[]> {
    return this.traders;
  }

  async getTraderById(id: number): Promise<Trader> {
    return this.traders.find((t) => t.id === id);
  }
}

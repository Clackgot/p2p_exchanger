import { faker } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MockTradersRepository {
  private logger = new Logger('MockTradersRepository');
  private traders: Trader[] = [];

  constructor() {
    const mockTradersCount = 10;
    this.traders = this.generateTraders(mockTradersCount);
    this.logger.debug(`Создано ${mockTradersCount} тестовых трейдеров`);
  }

  private generateTraders(count: number): Trader[] {
    const traders: Trader[] = [];
    for (let i = 0; i < count; i++) {
      const trader: Trader = {
        id: faker.number.int({ min: 1000000000, max: 2000000000 }),
        name: faker.internet.userName(),
      };
      traders.push(trader);
    }
    return traders;
  }

  async getTraders(): Promise<Trader[]> {
    return this.traders;
  }

  async getTraderById(id: number): Promise<Trader> {
    return this.traders.find((t) => t.id === id);
  }
}

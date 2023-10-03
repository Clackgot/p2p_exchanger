import { faker } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MockMerchantsRepository {
  private logger = new Logger('MockMerchantsRepository');
  private merchants: Merchant[] = [];

  constructor() {
    const mockMerchantsCount = 10;
    this.merchants = this.generateMerchants(mockMerchantsCount);
    this.logger.debug(`Создано ${mockMerchantsCount} тестовых мерчантов`);
  }

  private generateMerchants(count: number): Merchant[] {
    const merchants: Merchant[] = [];
    for (let i = 0; i < count; i++) {
      const trader: Merchant = {
        id: faker.number.int({ min: 1000000000, max: 2000000000 }),
        name: faker.internet.userName(),
      };
      merchants.push(trader);
    }
    return merchants;
  }

  async getMerchants(): Promise<Merchant[]> {
    return this.merchants;
  }

  async getMerchantById(id: number): Promise<Merchant> {
    return this.merchants.find((t) => t.id === id);
  }
}

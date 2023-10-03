import { Injectable, Logger } from '@nestjs/common';
import { generateMerchants } from './utils/generate-merchants';

@Injectable()
export class MockMerchantsRepository {
  private logger = new Logger('MockMerchantsRepository');
  private merchants: Merchant[] = [];

  constructor() {
    this.merchants = generateMerchants({ min: 4, max: 10 });
    this.logger.debug(`Создано ${this.merchants.length} тестовых мерчантов`);
  }

  async getMerchants(): Promise<Merchant[]> {
    return this.merchants;
  }

  async getMerchantById(id: number): Promise<Merchant> {
    return this.merchants.find((t) => t.id === id);
  }
}

import { Injectable } from '@nestjs/common';
import { MockMerchantsRepository } from './merchants.mock-repository';

@Injectable()
export class MerchantsService {
  constructor(
    private readonly mockMerchantsRepository: MockMerchantsRepository,
  ) {}

  async getMerchants(): Promise<Merchant[]> {
    return this.mockMerchantsRepository.getMerchants();
  }

  async getMerchantById(id: number): Promise<Merchant> {
    return this.mockMerchantsRepository.getMerchantById(id);
  }
}

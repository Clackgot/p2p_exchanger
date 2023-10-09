import { Injectable, NotFoundException } from '@nestjs/common';
import { MockMerchantsRepository } from './merchants.mock-repository';
import { Merchant } from 'src/models/merchant.model';

@Injectable()
export class MerchantsService {
  constructor(
    private readonly mockMerchantsRepository: MockMerchantsRepository,
  ) {}

  async getMerchants(): Promise<Merchant[]> {
    return this.mockMerchantsRepository.getMerchants();
  }

  async getMerchantById(id: number): Promise<Merchant> {
    const merchant: Merchant | undefined =
      await this.mockMerchantsRepository.getMerchantById(id);

    if (!merchant) throw new NotFoundException('Мерчант с таким ID не найден');
    return merchant;
  }
}

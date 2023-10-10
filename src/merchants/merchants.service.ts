import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { MerchantsRepository } from './merchants.repository';

@Injectable()
export class MerchantsService {
  constructor(private readonly merchantsRepository: MerchantsRepository) {}

  async getMerchants(): Promise<User[]> {
    return this.merchantsRepository.getMerchants();
  }

  async getMerchantById(id: string): Promise<User> {
    return this.merchantsRepository.getMerchantById(id);
  }
}

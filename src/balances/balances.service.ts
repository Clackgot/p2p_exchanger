import { Injectable } from '@nestjs/common';
import { BalancesRepository } from './balances.repository';
import { Balance } from 'src/models/balance.model';

@Injectable()
export class BalancesService {
  constructor(private readonly balancesRepository: BalancesRepository) {}

  async getBalances(): Promise<Balance[]> {
    return this.balancesRepository.getBalances();
  }
}

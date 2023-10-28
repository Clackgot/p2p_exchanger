import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from 'src/models/balance.model';
import { Repository } from 'typeorm';

@Injectable()
export class BalancesRepository {
  constructor(
    @InjectRepository(Balance)
    private readonly balancesRepository: Repository<Balance>,
  ) {}

  async getBalances(): Promise<Balance[]> {
    return this.balancesRepository.find();
  }
}

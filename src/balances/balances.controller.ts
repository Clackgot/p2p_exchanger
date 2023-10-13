import { Controller, Get } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { Balance } from 'src/models/balance.model';

@Controller('balances')
export class BalancesController {
  constructor(private readonly balancesService: BalancesService) {}

  @Get()
  async getBalances(): Promise<Balance[]> {
    return this.balancesService.getBalances();
  }
}

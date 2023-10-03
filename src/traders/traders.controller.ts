import { Controller, Get, Param } from '@nestjs/common';
import { TradersService } from './traders.service';

@Controller('traders')
export class TradersController {
  constructor(private readonly tradersService: TradersService) {}

  @Get()
  async getAllTraders() {
    return this.tradersService.getTraders();
  }

  @Get('/:id')
  async getTraderById(@Param('id') id: number) {
    return this.tradersService.getTraderById(id);
  }
}

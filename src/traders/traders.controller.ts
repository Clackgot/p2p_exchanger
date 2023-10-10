import { Controller, Get, Param } from '@nestjs/common';
import { TradersService } from './traders.service';
import { User } from 'src/models/user.model';

@Controller('traders')
export class TradersController {
  constructor(private readonly tradersService: TradersService) {}

  @Get()
  async getAllTraders(): Promise<User[]> {
    return this.tradersService.getTraders();
  }

  @Get('/:id')
  async getTraderById(@Param('id') id: string): Promise<User> {
    return this.tradersService.getTraderById(id);
  }
}

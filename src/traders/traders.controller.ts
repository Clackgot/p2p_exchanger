import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TradersService } from './traders.service';
import { User } from 'src/models/user.model';
import { CreateTraderDto } from './dto/create-trader.dto';

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

  @Post()
  async createTrader(@Body() dto: CreateTraderDto): Promise<User> {
    return this.tradersService.createTrader(dto);
  }
}

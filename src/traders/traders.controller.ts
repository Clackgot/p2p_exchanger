import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { TradersService } from './traders.service';
import { User } from 'src/models/user.model';
import { CreateTraderDto } from './dto/create-trader.dto';
import { RemoveCardDublicatesPipe } from './pipes/remove-card-dublicates.pipe';

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
  @UsePipes(new RemoveCardDublicatesPipe())
  async createTrader(@Body() dto: CreateTraderDto): Promise<User> {
    return this.tradersService.createTrader(dto);
  }
}

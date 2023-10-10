import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { TradersRepository } from './traders.repository';
import { TronwebService } from 'src/providers/tronweb/tronweb.service';
import { CreateTraderDto } from './dto/create-trader.dto';

@Injectable()
export class TradersService {
  constructor(
    private readonly tradersRepository: TradersRepository,
    private readonly tronwebService: TronwebService,
  ) {}
  async getTraders(): Promise<User[]> {
    return this.tradersRepository.getTraders();
  }

  async getTraderById(id: string): Promise<User> {
    return this.tradersRepository.getTraderById(id);
  }

  async createTrader(dto: CreateTraderDto): Promise<User> {
    return this.tradersRepository.createTrader(dto);
  }
}

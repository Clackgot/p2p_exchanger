import { Controller, Get } from '@nestjs/common';
import { TronAccount } from 'src/models/tron-account.model';
import { TronService } from './tron.service';

@Controller('tron')
export class TronController {
  constructor(private readonly tronService: TronService) {}
  @Get()
  async generateTronAccount(): Promise<TronAccount> {
    return this.tronService.generateTronAccount();
  }
}

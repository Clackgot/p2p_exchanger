import { Controller, Get, Param } from '@nestjs/common';
import { TronAccount } from 'src/models/tron-account.model';
import { TronService } from './tron.service';

@Controller('tron')
export class TronController {
  constructor(private readonly tronService: TronService) {}
  @Get()
  async generateTronAccount(): Promise<TronAccount> {
    return this.tronService.generateTronAccount();
  }
  @Get('hex-to-base58/:hex')
  hexToBase58(@Param('hex') hex: string): string {
    return this.tronService.hexToBase58(hex);
  }

  @Get('base58-to-hex/:base58')
  base58ToHex(@Param('base58') base58: string): string {
    return this.tronService.base58ToHex(base58);
  }
}

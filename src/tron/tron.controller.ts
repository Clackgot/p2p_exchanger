import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TronAccount } from 'src/models/tron-account.model';
import { TronService } from './tron.service';
import { SendUsdtDto } from 'src/providers/tronweb/dto/send-usdt.dto';
import { Transaction } from 'src/models/transaction.model';
import { SendTrxDto } from 'src/providers/tronweb/dto/send-trx.dto';

@Controller('tron')
export class TronController {
  constructor(private readonly tronService: TronService) {}
  @Get()
  generateTronAccount(): Omit<TronAccount, 'id'> {
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

  @Post('usdt')
  async sendUsdt(@Body() dto: SendUsdtDto): Promise<Transaction> {
    return this.tronService.sendUsdt(dto);
  }
  @Post('trx')
  async sendTrx(@Body() dto: SendTrxDto): Promise<string> {
    return this.tronService.sendTrx(dto);
  }

  @Get('account-info/:address')
  async getAccountInfo(@Param('address') address: string): Promise<any> {
    return this.tronService.getAccountInfo(address);
  }
}

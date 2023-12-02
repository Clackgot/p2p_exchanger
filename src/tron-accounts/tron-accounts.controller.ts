import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TronAccountsService } from './tron-accounts.service';
import { TronAccount } from 'src/models/tron-account.model';
import { UpdateTronAccountDto } from './dto/update-tron-account.dto';

@Controller('tron-accounts')
export class TronAccountsController {
  constructor(private readonly tronAccountsService: TronAccountsService) {}

  @Get()
  async getAll(): Promise<TronAccount[]> {
    return this.tronAccountsService.getAll();
  }

  @Post()
  async generateTronAccount(): Promise<TronAccount> {
    return this.tronAccountsService.generateTronAccount();
  }

  @Get('/:address')
  async getByAddress(@Param('address') address: string): Promise<TronAccount> {
    return this.tronAccountsService.getByAddress(address);
  }

  @Patch('/:address')
  async updateAccount(
    @Param('address') address: string,
    @Body() updateTronAccountDto: UpdateTronAccountDto,
  ): Promise<TronAccount> {
    return this.tronAccountsService.updateAccount(
      address,
      updateTronAccountDto,
    );
  }
}

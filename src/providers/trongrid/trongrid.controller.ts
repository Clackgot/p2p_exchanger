import { Controller, Get, Param } from '@nestjs/common';
import { TrongridService } from './trongrid.service';
import { TronAccountInfo } from './types';

@Controller('trongrid')
export class TrongridController {
  constructor(private readonly trongridService: TrongridService) {}

  @Get('/:address')
  async getAddressInfo(
    @Param('address') address: string,
  ): Promise<TronAccountInfo> {
    return this.trongridService.getTronAccountInfoByAddress(address);
  }
}

import { Controller, Get, Param, Query } from '@nestjs/common';
import { TrongridService } from './trongrid.service';
import { AddressInfo } from './types';

@Controller('trongrid')
export class TrongridController {
  constructor(private readonly trongridService: TrongridService) {}

  @Get('/:address')
  async getAddressInfo(
    @Param('address') address: string,
  ): Promise<AddressInfo> {
    return this.trongridService.getAddressInfo(address);
  }
}

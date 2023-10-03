import { Controller, Get, Param } from '@nestjs/common';
import { MerchantsService } from './merchants.service';

@Controller('merchants')
export class MerchantsController {
  constructor(private readonly merchantsService: MerchantsService) {}

  @Get()
  async getAllMerchants() {
    return this.merchantsService.getMerchants();
  }

  @Get('/:id')
  async getMerchantById(@Param('id') id: number) {
    return this.merchantsService.getMerchantById(id);
  }
}

import { Controller, Get, Param } from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { User } from 'src/models/user.model';

@Controller('merchants')
export class MerchantsController {
  constructor(private readonly merchantsService: MerchantsService) {}

  @Get()
  async getAllMerchants(): Promise<User[]> {
    return this.merchantsService.getMerchants();
  }

  @Get('/:id')
  async getMerchantById(@Param('id') id: string): Promise<User> {
    return this.merchantsService.getMerchantById(id);
  }
}

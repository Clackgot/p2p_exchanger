import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { User } from 'src/models/user.model';
import { CreateMerchantDto } from './dto/create-merchant.dto';

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

  @Post()
  async createMerchant(@Body() dto: CreateMerchantDto): Promise<User> {
    return this.merchantsService.createMerchant(dto);
  }
}

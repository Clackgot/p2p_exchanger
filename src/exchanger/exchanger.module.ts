import { Module } from '@nestjs/common';
import { ExchangerService } from './exchanger.service';
import { ExchangerController } from './exchanger.controller';

@Module({
  providers: [ExchangerService],
  controllers: [ExchangerController]
})
export class ExchangerModule {}

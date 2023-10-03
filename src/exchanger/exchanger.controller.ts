import { Controller, Get } from '@nestjs/common';
import { ExchangerService } from './exchanger.service';

@Controller('exchanger')
export class ExchangerController {
  constructor(private readonly exchangerService: ExchangerService) {}
}

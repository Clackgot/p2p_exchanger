import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TrongridService {
  private logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly httpService: HttpService) {}
}

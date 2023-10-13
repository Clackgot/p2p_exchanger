import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ExchangerRepository {
  private readonly logger = new Logger(this.constructor.name);
}

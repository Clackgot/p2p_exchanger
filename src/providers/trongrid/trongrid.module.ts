import { Logger, Module } from '@nestjs/common';
import { TrongridService } from './trongrid.service';
import { HttpModule } from '@nestjs/axios';
import applicationConstants from 'src/config/applicationConstants';
import { errorMessages } from 'src/constants/errorMessages';

@Module({
  imports: [
    HttpModule.register({
      baseURL: applicationConstants.TRONGRID.TRONGRID_API_URL,
      headers: {
        'TRON-PRO-API-KEY': applicationConstants.TRONGRID.TRONGRID_API_KEY,
      },
      timeout: 5000,
      timeoutErrorMessage: errorMessages.trongridRequestTimeout,
    }),
  ],
  providers: [TrongridService],
  exports: [TrongridService],
})
export class TrongridModule {
  private logger = new Logger(this.constructor.name);

  constructor(private readonly trongridService: TrongridService) {}

  async onModuleInit(): Promise<void> {
    const addressInfo = await this.trongridService.getAddressInfo(
      applicationConstants.STORAGE.ADDRESS,
    );

    this.logger.debug(
      `${addressInfo.address} => USDT: ${addressInfo.usdt} | TRX: ${addressInfo.trx}`,
    );

    if (addressInfo.usdt === 0) {
      this.logger.warn(`Баланс USDT ${addressInfo.address} пуст`);
    }
  }
}

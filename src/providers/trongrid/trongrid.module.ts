import { Module } from '@nestjs/common';
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
})
export class TrongridModule {}

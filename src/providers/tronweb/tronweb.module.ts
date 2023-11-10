import { Module } from '@nestjs/common';
import { TronwebService } from './tronweb.service';
import { TrongridModule } from '../trongrid/trongrid.module';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as TronWeb from 'tronweb';
import applicationConstants from 'src/config/applicationConstants';

@Module({
  imports: [TrongridModule],
  providers: [
    TronwebService,
    {
      provide: TronWeb,
      useFactory: () => {
        return new TronWeb({
          fullHost: applicationConstants.TRONGRID.TRONGRID_API_URL,
          headers: {
            'TRON-PRO-API-KEY': applicationConstants.TRONGRID.TRONGRID_API_KEY,
          },
          privateKey: applicationConstants.STORAGE.PRIVATE_KEY,
        });
      },
    },
  ],
  exports: [TronwebService],
})
export class TronwebModule {}

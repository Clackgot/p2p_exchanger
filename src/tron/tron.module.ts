import { Module } from '@nestjs/common';
import { TronService } from './tron.service';
import { TronwebModule } from 'src/providers/tronweb/tronweb.module';
import { TrongridModule } from 'src/providers/trongrid/trongrid.module';
import { TronController } from './tron.controller';
import applicationConstants from 'src/config/applicationConstants';

@Module({
  imports: [
    TronwebModule.forRoot({
      apiKey: applicationConstants.TRONGRID.TRONGRID_API_KEY,
      apiUrl: applicationConstants.TRONGRID.TRONGRID_API_URL,
    }),
    TrongridModule,
  ],
  providers: [TronService],
  controllers: [TronController],
  exports: [TronService],
})
export class TronModule {}

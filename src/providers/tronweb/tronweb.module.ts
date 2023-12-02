import { DynamicModule, Module, Provider, Scope } from '@nestjs/common';
import { TronwebService } from './tronweb.service';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as TronWeb from 'tronweb';
import applicationConstants from 'src/config/applicationConstants';

export class TronWebOptions {
  apiUrl: string;
  apiKey: string;
  privateKey?: string;
}

@Module({})
export class TronwebModule {
  static forRoot(options: TronWebOptions): DynamicModule {
    const tronWebProvider: Provider = {
      provide: TronWeb,
      useFactory: () => {
        return new TronWeb({
          fullHost:
            options.apiUrl || applicationConstants.TRONGRID.TRONGRID_API_URL,
          headers: {
            'TRON-PRO-API-KEY':
              options.apiKey || applicationConstants.TRONGRID.TRONGRID_API_KEY,
          },
        });
      },
      scope: Scope.TRANSIENT,
    };

    const tronwebServiceProvider: Provider = {
      provide: TronwebService,
      useFactory: (tronWeb: TronWeb) => new TronwebService(tronWeb),
      scope: Scope.TRANSIENT,
      inject: [TronWeb],
    };

    return {
      module: TronwebModule,
      providers: [tronWebProvider, tronwebServiceProvider],
      exports: [tronwebServiceProvider],
    };
  }
}

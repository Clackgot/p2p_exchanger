import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import applicationConstants from 'src/config/applicationConstants';

interface AddressInfo {
  address: string;
  usdtTetherBalance: number;
}
@Injectable()
export class TrongridService {
  private logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly httpService: HttpService) {}

  async getAddressInfo(address: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get(`v1/accounts/${address}`).pipe(
        catchError((error) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    const trc20_tokens: any[] = data?.data[0]?.trc20 ?? [];

    const usdtTetherBalance =
      trc20_tokens.map(
        (token) => token?.[applicationConstants.TETHER_USDT_TOKEN_ADDRESS],
      )?.[0] ?? 0;

    return {
      address,
      usdtTetherBalance: usdtTetherBalance / 1_000_000,
    };
  }
}

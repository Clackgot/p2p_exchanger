import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import applicationConstants from 'src/config/applicationConstants';
import { RetryOnError } from 'src/decorators/retry-on-error.decorator';
import { AddressInfo } from './types';

@Injectable()
export class TrongridService {
  private logger: Logger = new Logger(this.constructor.name);

  constructor(private readonly httpService: HttpService) {}

  @RetryOnError()
  async getAddressInfo(address: string): Promise<AddressInfo> {
    const { data } = await firstValueFrom(
      this.httpService.get(`v1/accounts/${address}`),
    );

    if (!data?.data[0]) {
      return { address, trx: 0, usdt: 0 };
    }
    const trc20tokens: { [token: string]: string }[] =
      data?.data[0]?.trc20 ?? [];
    const keyToFind = applicationConstants.TETHER_USDT_TOKEN_ADDRESS;
    const usdtToken = trc20tokens.find((obj) => obj[keyToFind]);
    const usdt = usdtToken ? parseInt(usdtToken[keyToFind]) / 1_000_000 : 0;

    const trx = parseInt(data?.data[0]?.balance) / 1_000_000 || 0;

    return { address, trx, usdt };
  }
}

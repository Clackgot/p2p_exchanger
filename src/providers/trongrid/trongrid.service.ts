import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import applicationConstants from 'src/config/applicationConstants';
import { TronAccountInfo } from './types';
import { ITrongridService } from './interfaces';

@Injectable()
export class TrongridService implements ITrongridService {
  constructor(private readonly httpService: HttpService) {}

  async getTronAccountInfoByAddress(address: string): Promise<TronAccountInfo> {
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

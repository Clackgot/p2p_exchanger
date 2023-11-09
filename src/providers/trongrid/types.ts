import { Balance } from 'src/models/balance.model';
import { TronAccount } from 'src/models/tron-account.model';

export class AddressInfo
  implements Pick<TronAccount, 'address'>, Omit<Balance, 'rub' | 'id'>
{
  trx: number;
  usdt: number;
  address: string;
}

import { Transaction } from 'src/models/transaction.model';
import { TronAccount } from 'src/models/tron-account.model';

export class SendUsdtDto implements Pick<Transaction, 'usdt'> {
  from: TronAccount;
  to: TronAccount;
  usdt: number;
}

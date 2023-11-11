import { Transaction } from 'src/models/transaction.model';
import { TronAccount } from 'src/models/tron-account.model';

export class CreateTransactionDto
  implements Pick<Transaction, 'from' | 'to' | 'trx' | 'usdt'>
{
  from: TronAccount;
  to: TronAccount;
  trx: number;
  usdt: number;
}

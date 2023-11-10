import { Transaction } from 'src/models/transaction.model';
import { User } from 'src/models/user.model';

export class CreateTransactionDto
  implements Pick<Transaction, 'from' | 'to' | 'trx' | 'usdt'>
{
  from: User;
  to: User;
  trx: number;
  usdt: number;
}

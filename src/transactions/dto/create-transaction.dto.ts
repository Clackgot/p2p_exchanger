import { Transaction } from 'src/models/transaction.model';
import { User } from 'src/models/user.model';

export class CreateTransactionDto
  implements Pick<Transaction, 'sender' | 'recipient' | 'trx' | 'usdt'>
{
  sender: User;
  recipient: User;
  trx: number;
  usdt: number;
}

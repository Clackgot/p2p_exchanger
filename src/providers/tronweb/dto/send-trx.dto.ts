import { Transaction } from 'src/models/transaction.model';
import { TronAccount } from 'src/models/tron-account.model';

export class SendTrxDto implements Pick<Transaction, 'trx'> {
  from: TronAccount;
  to: TronAccount;
  trx: number;
}

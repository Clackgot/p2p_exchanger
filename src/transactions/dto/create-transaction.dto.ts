import {
  Transaction,
  TransactionObjective,
  TransactionStatus,
} from 'src/models/transaction.model';
import { TronAccount } from 'src/models/tron-account.model';

export class CreateTransactionDto implements Transaction {
  id: string;
  from: TronAccount;
  to: TronAccount;
  usdt: number;
  trx: number;
  status?: TransactionStatus;
  objective?: TransactionObjective;
}

import { TransactionAmount } from 'src/models/transaction-amount.model';
import { Transaction } from 'src/models/transaction.model';

export class CreateTransactionDto
  implements Pick<Transaction, 'transferAmount'>
{
  senderId: string;
  recipientId: string;
  transferAmount: TransactionAmount;
}

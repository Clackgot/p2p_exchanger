import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.model';
import { TransactionAmount } from './transaction-amount.model';

@Entity({
  name: 'transactions',
})
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'sender' })
  sender: User;

  @OneToOne(() => User)
  @JoinColumn({ name: 'recipient' })
  recipient: number;

  @OneToOne(() => TransactionAmount)
  @JoinColumn({ name: 'transfer_amount' })
  transferAmount: TransactionAmount;
}

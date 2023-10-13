import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.model';
import { TransactionAmount } from './transaction-amount.model';

export enum TransactionStatus {
  Created = 'Создана',
  Confirmed = 'Подтверждена',
  Rejected = 'Отклонена',
}

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
  recipient: User;

  @OneToOne(() => TransactionAmount)
  @JoinColumn({ name: 'transfer_amount' })
  transferAmount: TransactionAmount;

  @Column({
    name: 'status',
    enum: TransactionStatus,
    default: TransactionStatus.Created,
  })
  status: TransactionStatus;
}

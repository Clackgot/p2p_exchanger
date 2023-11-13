import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { TronAccount } from './tron-account.model';

export enum TransactionStatus {
  Created = 'CREATED',
  Confirmed = 'CONFIRMED',
  Rejected = 'REJECTED',
}

export enum TransactionObjective {
  ActivateAccount = 'ACTIVATE_ACCOUNT',
  WithdrawUsdt = 'WITHDRAW_USDT',
  ReplenishingTrx = 'REPLENISHING',
  None = 'NONE',
}

@Entity({
  name: 'transactions',
})
export class Transaction {
  @PrimaryColumn({ unique: true, nullable: false })
  id: string;

  @ManyToOne(() => TronAccount)
  @JoinColumn({ name: 'from' })
  from: TronAccount;

  @ManyToOne(() => TronAccount)
  @JoinColumn({ name: 'to' })
  to: TronAccount;

  @Column({ name: 'usdt', nullable: false })
  usdt: number;

  @Column({ name: 'trx', nullable: false })
  trx: number;

  @Column({
    name: 'status',
    enum: TransactionStatus,
    default: TransactionStatus.Created,
  })
  status?: TransactionStatus;

  @Column({
    name: 'objective',
    enum: TransactionObjective,
    default: TransactionObjective.None,
  })
  objective?: TransactionStatus;
}

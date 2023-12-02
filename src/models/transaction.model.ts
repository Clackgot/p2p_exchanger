import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { TronAccount } from './tron-account.model';

export enum TransactionStatus {
  Created = 'CREATED',
  Success = 'SUCCESS',
  Revert = 'REVERT',
  OutOfEnergy = 'OUT_OF_ENERGY',
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

  @ManyToOne(() => TronAccount, { eager: true })
  @JoinColumn({ name: 'from' })
  from: TronAccount;

  @ManyToOne(() => TronAccount, { eager: true })
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
  objective?: TransactionObjective;
}

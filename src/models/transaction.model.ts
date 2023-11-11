import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.model';
import { TronAccount } from './tron-account.model';

export enum TransactionStatus {
  Created = 'CREATED',
  Confirmed = 'COBFIRMED',
  Rejected = 'REJECTED',
}

@Entity({
  name: 'transactions',
})
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
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
  status: TransactionStatus;
}

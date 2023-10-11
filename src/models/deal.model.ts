import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.model';
import { Transaction } from './transaction.model';

enum DealStatus {
  SUCCESS = 'SUCCESS',
  REJECTED = 'REJECTED',
  PENDING = 'PENDING',
}

@Entity({
  name: 'deals',
})
export class Deals {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'status', enum: DealStatus, enumName: 'deal_status' })
  status: DealStatus;

  @OneToOne(() => User)
  @JoinColumn({ name: 'trader' })
  trader: User;

  @OneToOne(() => Transaction)
  @JoinColumn({ name: 'get_amount' })
  get: Transaction;

  @OneToOne(() => Transaction)
  @JoinColumn({ name: 'give_transaction' })
  give: Transaction;
}

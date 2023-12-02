import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.model';

@Entity({
  name: 'balances',
})
export class Balance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'trx', nullable: false })
  trx: number;

  @Column({ name: 'usdt', nullable: false })
  usdt: number;

  @Column({ name: 'rub', nullable: false })
  rub: number;

  @OneToOne(() => User, (user) => user.balance, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Balance } from './balance.model';

@Entity({
  name: 'transaction_amounts',
})
export class TransactionAmount implements Omit<Balance, 'id' | 'rub'> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'usdt', nullable: false })
  usdt: number;

  @Column({ name: 'trx', nullable: false })
  trx: number;
}

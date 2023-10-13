import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

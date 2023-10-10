import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.model';

@Entity({
  name: 'bank_cards',
})
export class BankCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'number', nullable: false })
  number: string;

  @Column({ name: 'holder', nullable: false })
  holder: string;

  @Column({ name: 'issuer', nullable: true })
  issuer?: string;

  @ManyToOne(() => User, (user) => user.bankCards)
  @JoinColumn({ name: 'owner' })
  owner: User;
}

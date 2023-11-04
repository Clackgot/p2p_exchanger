import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.model';

@Entity({
  name: 'bank_cards',
})
export class BankCard {
  @PrimaryColumn({ type: 'text' })
  id: string;

  @Column({ name: 'holder', nullable: false })
  holder: string;

  @Column({ name: 'issuer', nullable: true })
  issuer?: string;

  @ManyToOne(() => User, (user) => user.bankCards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner' })
  owner: User;
}

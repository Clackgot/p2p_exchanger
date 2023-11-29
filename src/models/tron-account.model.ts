import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.model';

@Entity({
  name: 'tron_accounts',
})
export class TronAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'address', nullable: false, unique: true })
  address: string;

  @Column({ name: 'private_key', nullable: false })
  privateKey: string;

  @Column({ name: 'seed_phrase', nullable: false })
  seedPhrase: string;

  @Column({ name: 'public_key', nullable: true })
  publicKey: string;

  @Column({ name: 'isActivated', default: false })
  isActivated: boolean;

  @OneToOne(() => User, (user) => user.tronAccount, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  user: User;
}

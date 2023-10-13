import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TelegramUser } from './telegram-user.model';
import { TronAccount } from './tron-account.model';
import { Balance } from './balance.model';
import { BankCard } from './bank-card.model';

export enum UserRole {
  admin = 'admin',
  trader = 'trader',
  merchant = 'merchant',
}

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => TelegramUser, {
    nullable: false,
    eager: true,
    cascade: ['insert', 'update', 'soft-remove', 'recover'],
  })
  @JoinColumn({ name: 'telegram_user' })
  telegramUser: TelegramUser;

  @OneToOne(() => TronAccount, {
    nullable: false,
    eager: true,
    cascade: ['insert', 'update', 'soft-remove', 'recover'],
  })
  @JoinColumn({ name: 'tron_account' })
  tronAccount: TronAccount;

  @OneToOne(() => Balance, {
    nullable: false,
    cascade: ['insert', 'update', 'soft-remove', 'recover'],
  })
  @JoinColumn({ name: 'balance' })
  balance: Balance;

  @Column({ name: 'role', enum: UserRole, nullable: false })
  role: UserRole;

  @OneToMany(() => BankCard, (card) => card.owner, {
    eager: true,
    cascade: ['insert', 'update', 'soft-remove', 'recover'],
    nullable: true,
  })
  @JoinColumn({ name: 'bank_cards' })
  bankCards: BankCard[];
}

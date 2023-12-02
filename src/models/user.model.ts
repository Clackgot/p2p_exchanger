import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TelegramUser } from './telegram-user.model';
import { TronAccount } from './tron-account.model';
import { Balance } from './balance.model';
import { BankCard } from './bank-card.model';

export enum UserRole {
  admin = 'admin',
  trader = 'trader',
  merchant = 'merchant',
  guest = 'guest',
}

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => TelegramUser, (telegramUser) => telegramUser.user, {
    nullable: false,
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  telegramUser: TelegramUser;

  @OneToOne(() => TronAccount, (tronAccount) => tronAccount.user, {
    nullable: false,
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  tronAccount: TronAccount;

  @OneToOne(() => Balance, (balance) => balance.user, {
    nullable: false,
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  balance: Balance;

  @Column({
    name: 'role',
    enum: UserRole,
    nullable: false,
    default: UserRole.guest,
  })
  role: UserRole;

  @OneToMany(() => BankCard, (card) => card.owner, {
    eager: true,
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  bankCards: BankCard[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}

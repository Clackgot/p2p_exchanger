import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.model';

@Entity({
  name: 'telegram_users',
})
export class TelegramUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'bigint' })
  telegramId: number;

  @Column({ name: 'username', nullable: true })
  username?: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToOne(() => User, (user) => user.telegramUser, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}

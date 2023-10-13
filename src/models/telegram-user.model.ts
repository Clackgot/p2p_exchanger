import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'telegram_users',
})
export class TelegramUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'identifier', nullable: false })
  identifier: number;

  @Column({ name: 'username', nullable: false })
  username: string;
}

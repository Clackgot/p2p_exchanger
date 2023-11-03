import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'telegram_users',
})
export class TelegramUser {
  @PrimaryColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'username', nullable: true })
  username?: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

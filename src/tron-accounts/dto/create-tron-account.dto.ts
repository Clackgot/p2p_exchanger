import { TronAccount } from 'src/models/tron-account.model';

export class CreateTronAccountDto implements Omit<TronAccount, 'id'> {
  address: string;
  privateKey: string;
  seedPhrase: string;
  publicKey: string;
}

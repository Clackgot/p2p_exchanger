import { TronAccount } from 'src/models/tron-account.model';

export class CreateTronAccountDto implements TronAccount {
  address: string;
  privateKey: string;
  seedPhrase: string;
  publicKey: string;
}

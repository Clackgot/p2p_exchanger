import { TronAccount } from 'src/models/tron-account.model';

export class CreateTronAccountDto
  implements
    Pick<TronAccount, 'address' | 'publicKey' | 'privateKey' | 'seedPhrase'>
{
  address: string;
  privateKey: string;
  seedPhrase: string;
  publicKey: string;
}

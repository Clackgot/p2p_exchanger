import { CreateTronAccountDto } from './create-tron-account.dto';

export class UpdateTronAccountDto
  implements Partial<Omit<CreateTronAccountDto, 'id'>>
{
  privateKey: string;
  seedPhrase: string;
  publicKey: string;
}

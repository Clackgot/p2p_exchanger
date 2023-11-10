import { TronAccount } from 'src/models/tron-account.model';

export interface ITronwebService {
  getTronAccountFromMnemonic(seedPhrase: string): Promise<TronAccount>;
  generateTronAccount(): Promise<TronAccount>;
}

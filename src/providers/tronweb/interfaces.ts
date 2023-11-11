import { Transaction } from 'src/models/transaction.model';
import { TronAccount } from 'src/models/tron-account.model';
import { SendUsdtDto } from './dto/send-usdt.dto';

export interface ITronwebService {
  getTronAccountFromMnemonic(seedPhrase: string): Promise<TronAccount>;
  generateTronAccount(): Promise<TronAccount>;
  sendUsdt(dto: SendUsdtDto): Promise<Transaction>;
  hexToBase58(hex: string): string;
  base58ToHex(base58: string): string;
}

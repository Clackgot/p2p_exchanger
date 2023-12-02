import { TronAccount } from 'src/models/tron-account.model';
import { SendUsdtDto } from './dto/send-usdt.dto';
import { SendTrxDto } from './dto/send-trx.dto';
import { CreateTronAccountDto } from 'src/tron-accounts/dto/create-tron-account.dto';

export interface ITronwebService {
  getTronAccountFromMnemonic(seedPhrase: string): CreateTronAccountDto;
  generateTronAccount(): CreateTronAccountDto;
  sendUsdt(dto: SendUsdtDto): Promise<string>;
  sendTrx(dto: SendTrxDto): Promise<string>;
  hexToBase58(hex: string): string;
  base58ToHex(base58: string): string;
  getAccountInfo(address: string): Promise<any>;
  isAccountActivate(account: TronAccount): Promise<boolean>;
  getTransaction(transactionId: string): Promise<any>;
  getTransactionInfo(transactionId: string): Promise<any>;
}

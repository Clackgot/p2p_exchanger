import { TronAccountInfo } from './types';

export interface ITrongridService {
  getTronAccountInfoByAddress(address: string): Promise<TronAccountInfo>;
}

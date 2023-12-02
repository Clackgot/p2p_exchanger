import { TronAccountInfo } from 'src/providers/trongrid/types';

export type UserBalanceInfo = TronAccountInfo & { username: string | number };

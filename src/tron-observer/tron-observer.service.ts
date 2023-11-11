import { Injectable, Logger } from '@nestjs/common';
import { TronAccountInfo } from 'src/providers/trongrid/types';
import { TronService } from 'src/tron/tron.service';
import { UsersService } from 'src/users/users.service';

type UserBalanceInfo = TronAccountInfo & { username: string | number };

@Injectable()
export class TronObserverService {
  private logger = new Logger(this.constructor.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly tronService: TronService,
  ) {}
  // @Cron(CronExpression.EVERY_5_SECONDS)
  async observeTronBalances() {
    const users = await this.usersService.getAllUsers();
    const userBalanceList: Promise<UserBalanceInfo>[] = users.map(async (u) => {
      const info = await this.tronService.getTronAccountInfoByAddress(
        u.tronAccount.address,
      );
      return {
        ...info,
        username: u.telegramUser.username || u.telegramUser.id,
      };
    });

    const balances = await Promise.all(userBalanceList);
    console.log(balances);
  }
}

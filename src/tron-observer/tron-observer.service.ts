import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserRole } from 'src/models/user.model';
import { TronAccountInfo } from 'src/providers/trongrid/types';
import { TronAccountsService } from 'src/tron-accounts/tron-accounts.service';
import { TronService } from 'src/tron/tron.service';
import { UsersService } from 'src/users/users.service';
import { UserBalanceInfo } from './types';

@Injectable()
export class TronObserverService {
  private logger = new Logger(this.constructor.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly tronService: TronService,
    private readonly tronAccountsService: TronAccountsService,
  ) {
    this.updateActivationStatus();
  }
  // @Cron(CronExpression.EVERY_5_SECONDS)
  async getTronBalances() {
    const users = await this.usersService.getAllUsers();
    const tradersAccounts: Promise<UserBalanceInfo>[] = users
      .filter((u) => u.role === UserRole.trader)
      .map(async (u) => {
        const info = await this.tronService.getTronAccountInfoByAddress(
          u.tronAccount.address,
        );
        return {
          ...info,
          username: u.telegramUser.username || u.telegramUser.id,
        };
      });

    const balances = await Promise.all(tradersAccounts);
    console.log(balances);
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async updateActivationStatus() {
    const users = await this.usersService.getAllUsers();
    for (const user of users) {
      const isActive = await this.tronService.isAccountActivate(
        user.tronAccount,
      );
      const account = await this.tronAccountsService.getByAddress(
        user.tronAccount.address,
      );

      if (account.isActivated !== isActive) {
        this.logger.log(`Аккаунт ${user.tronAccount.address} был активирован`);
      }

      await this.tronAccountsService.updateActivationStatus(
        user.tronAccount.address,
        isActive,
      );
    }
  }
}

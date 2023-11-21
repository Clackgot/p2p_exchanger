import { Injectable, Logger } from '@nestjs/common';
import { User, UserRole } from 'src/models/user.model';
import { TronAccountInfo } from 'src/providers/trongrid/types';
import { TronAccountsService } from 'src/tron-accounts/tron-accounts.service';
import { TronService } from 'src/tron/tron.service';
import { UsersService } from 'src/users/users.service';
import { UserBalanceInfo } from './types';
import { minimumAdminTrxBalance } from './costants';
import { NotEnoughAdminTrxBalanceException as NotEnoughAdminsTrxBalancesException } from './errors/not-enough-admin-trx-balance.exception';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TransactionsService } from 'src/transactions/transactions.service';
import {
  TransactionObjective,
  TransactionStatus,
} from 'src/models/transaction.model';

@Injectable()
export class TronObserverService {
  private logger = new Logger(this.constructor.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly tronService: TronService,
    private readonly tronAccountsService: TronAccountsService,
    private readonly transactionsService: TransactionsService,
  ) {
    this.accountActivation();
  }

  /**
   * Выводит балансы трейдеров
   */
  // @Cron(CronExpression.EVERY_5_SECONDS)
  async getTradersTronBalances() {
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

  /**
   * Проверяет активацию аккаунта в сети TRON и обновляет статус аккаунта в системе
   */
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

  /**
   * Получение аккаунта администратора с непустыми балансом TRX
   */
  private async getAdminAccountWithValidTrxBalance(): Promise<User> {
    const admins = await this.usersService.getAllAdmins();
    for (const admin of admins) {
      const { address } = admin.tronAccount;
      const { trx }: TronAccountInfo =
        await this.tronService.getTronAccountInfoByAddress(address);
      if (trx > minimumAdminTrxBalance) {
        return admin;
      }
    }
    throw new NotEnoughAdminsTrxBalancesException();
  }

  /**
   * Создание транзакций на активацию аккаунтов трейдеров, для которых ещё не была инициирована активация
   */
  @Cron(CronExpression.EVERY_10_SECONDS)
  async accountActivation() {
    const traders = await this.usersService.getAllTraders();
    const disabledTradersAccounts = traders.filter(
      (trader) => !trader.tronAccount.isActivated,
    );
    if (disabledTradersAccounts.length === 0) {
      this.logger.verbose(`Аккаунтов для активации не найдено`);
    }
    for (const trader of disabledTradersAccounts) {
      const transactions = await this.transactionsService.getTransations();

      const transactionExsist = transactions.some(
        (t) =>
          t.to.address === trader.tronAccount.address &&
          t.status === TransactionStatus.Created &&
          t.objective === TransactionObjective.ActivateAccount,
      );
      if (transactionExsist) {
        this.logger.verbose(
          `Транзакция на активацию аккаунта ${trader.tronAccount.address} уже существует`,
        );
        continue;
      }
      try {
        const traderTronAccount = trader.tronAccount;
        const { tronAccount: adminTronAccount } =
          await this.getAdminAccountWithValidTrxBalance();
        const trxAmount = 0.000001;
        const transactionId = await this.tronService.sendTrx({
          from: adminTronAccount,
          to: traderTronAccount,
          trx: trxAmount,
        });
        await this.transactionsService.createTransation({
          id: transactionId,
          from: adminTronAccount,
          to: traderTronAccount,
          trx: trxAmount * 1_000_000,
          usdt: 0,
          status: TransactionStatus.Created,
          objective: TransactionObjective.ActivateAccount,
        });
        this.logger.verbose(
          `Создана транзакция ${transactionId} на перевод ${trxAmount} TRX с ${adminTronAccount.address} на ${traderTronAccount.address}`,
        );
      } catch (error) {
        this.logger.warn(error);
      }
    }
  }
}

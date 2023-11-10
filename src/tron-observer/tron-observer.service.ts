import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserRole } from 'src/models/user.model';
import { TrongridService } from 'src/providers/trongrid/trongrid.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TronObserverService {
  private logger = new Logger(this.constructor.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly trongridService: TrongridService,
  ) {}
  // @Cron(CronExpression.EVERY_5_SECONDS)
  async observeTronBalances() {
    const users = await this.usersService.getAllUsers();
    const accounts = users.map((u) => u.tronAccount.address);
    const promises = accounts.map((a) =>
      this.trongridService.getTronAccountInfoByAddress(a),
    );
    const balances = await Promise.all(promises);
    console.log(balances);
  }
}

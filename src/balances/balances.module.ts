import { Module } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { BalancesController } from './balances.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from 'src/models/balance.model';
import { BalancesRepository } from './balances.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Balance])],
  providers: [BalancesService, BalancesRepository],
  controllers: [BalancesController],
})
export class BalancesModule {}

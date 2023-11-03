import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { BankCard } from 'src/models/bank-card.model';
import { CardsRepository } from './cards.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, BankCard])],
  providers: [CardsService, CardsRepository],
  controllers: [CardsController],
  exports: [CardsService],
})
export class CardsModule {}

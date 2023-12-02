import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.model';
import { ScheduleModule } from '@nestjs/schedule';
import { TronModule } from 'src/tron/tron.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TronModule,
    ScheduleModule.forRoot(),
  ],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

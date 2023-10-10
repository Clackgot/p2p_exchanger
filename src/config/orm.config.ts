import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import applicationConstants from './applicationConstants';

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: applicationConstants.DATABASE.HOST,
  port: applicationConstants.DATABASE.PORT,
  username: applicationConstants.DATABASE.USERNAME,
  password: applicationConstants.DATABASE.PASSWORD,
  database: applicationConstants.DATABASE.NAME,
  entities: [__dirname + '/../**/models/*.model.{js,ts}'],
  synchronize: applicationConstants.DATABASE.SYNCHRONIZE,
  autoLoadEntities: true,
  migrationsRun: true,
  logging: false,
};

export const ormConfig = {
  ...typeOrmModuleOptions,
  migrationsTableName: 'migrations',
  migrations: ['dist/migrations/*.{js,ts}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
} as DataSourceOptions;

export default ormConfig;

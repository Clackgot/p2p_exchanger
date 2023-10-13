import { DataSource } from 'typeorm';
import { ormConfig } from 'src/config/orm.config';

const datasource = new DataSource(ormConfig);
datasource.initialize();
export default datasource;

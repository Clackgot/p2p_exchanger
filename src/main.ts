import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import applicationConstants from './config/applicationConstants';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('App');
  const app = await NestFactory.create(AppModule);
  await app.listen(applicationConstants.APP.PORT, () =>
    logger.verbose(
      `Приложение запущено на ${applicationConstants.APP.PORT} порту`,
    ),
  );
}
bootstrap();

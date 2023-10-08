import { plainToInstance } from 'class-transformer';
import {
  ValidateNested,
  validateSync,
  IsUrl,
  IsEnum,
  IsString,
  IsNumber,
  IsPort,
} from 'class-validator';
import { config } from 'dotenv';
import {
  IsTelegramBotToken,
  IsTronAddress,
  IsTronPrivateKey,
  IsTrongridAuthKey,
} from './decorators';
import { Logger } from '@nestjs/common';
import { ApplicationEnviroment } from './enums';
import { TronNet } from 'src/enums/enums';
config({ path: '.env' });

const logger = new Logger('Constants');

class TelegramBotConfig {
  @IsTelegramBotToken()
  TELEGRAM_BOT_TOKEN: string;

  @IsString()
  TELEGRAM_WEBHOOK_DOMAIN: string;

  @IsPort()
  TELEGRAM_WEBHOOK_PORT: number;
}

class TronAccount {
  @IsTronAddress()
  ADDRESS: string;

  @IsTronPrivateKey()
  PRIVATE_KEY: string;
}

class TrongridConfig {
  @IsUrl()
  TRONGRID_API_URL: string;
  @IsTrongridAuthKey()
  TRONGRID_API_KEY: string;
}

class TronscanConfig {
  @IsUrl()
  TRONSCAN_API_URL: string;
}

class ApplicationConstants {
  @ValidateNested()
  TRONGRID: TrongridConfig;

  @ValidateNested()
  TRONSCAN: TronscanConfig;

  @IsEnum(ApplicationEnviroment, {
    message: `ENVIROMENT должно быть: [${Object.keys(ApplicationEnviroment)}]`,
  })
  ENVIROMENT: ApplicationEnviroment;

  @IsEnum(TronNet, {
    message: `CURRENT_TRON_NET должно быть: [${Object.keys(TronNet)}]`,
  })
  CURRENT_TRON_NET: TronNet;

  @IsTronAddress()
  TETHER_USDT_TOKEN_ADDRESS: string;

  STORAGE: TronAccount;

  TELEGRAM: TelegramBotConfig;
}

let applicationConstants: ApplicationConstants = {
  TRONGRID: {
    TRONGRID_API_URL: process.env.TRONGRID_API_URL as string,
    TRONGRID_API_KEY: process.env.TRONGRID_API_KEY as string,
  },
  TRONSCAN: {
    TRONSCAN_API_URL: process.env.TRONSCAN_API_URL as string,
  },

  ENVIROMENT: process.env.APPLICATION_ENVIROMENT as ApplicationEnviroment,
  CURRENT_TRON_NET: process.env.CURRENT_TRON_NET as TronNet,

  TETHER_USDT_TOKEN_ADDRESS: process.env.TETHER_USDT_TOKEN_ADDRESS as string,

  STORAGE: {
    ADDRESS: process.env.STORAGE_TRON_ADDRESS as string,
    PRIVATE_KEY: process.env.STORAGE_TRON_ADDRESS_PRIVATE_KEY as string,
  },

  TELEGRAM: {
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN as string,
    TELEGRAM_WEBHOOK_DOMAIN: process.env.TELEGRAM_WEBHOOK_DOMAIN as string,
    TELEGRAM_WEBHOOK_PORT: parseInt(
      process.env.TELEGRAM_WEBHOOK_PORT as string,
    ),
  },
};

applicationConstants = plainToInstance(
  ApplicationConstants,
  applicationConstants,
  {
    enableImplicitConversion: true,
  },
);
const errors = validateSync(applicationConstants, {
  skipMissingProperties: false,
  dismissDefaultMessages: true,
});
errors.forEach((e) => logger.error(e));

if (errors.length > 0) {
  throw new Error(errors.join('\n'));
}

export default applicationConstants;

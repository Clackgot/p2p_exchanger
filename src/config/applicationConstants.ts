import { plainToInstance } from 'class-transformer';
import { ValidateNested, validateSync, IsUrl, IsEnum } from 'class-validator';
import { config } from 'dotenv';
import { IsTrongridAuthKey } from './decorators';
import { Logger } from '@nestjs/common';
import { ApplicationEnviroment } from './enums';
import { TronNet } from 'src/enums/enums';
config();

const logger = new Logger('Constants');

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
}

let applicationConstants: ApplicationConstants = {
  TRONGRID: {
    TRONGRID_API_URL: process.env.TRONGRID_API_URL,
    TRONGRID_API_KEY: process.env.TRONGRID_API_KEY,
  },
  TRONSCAN: {
    TRONSCAN_API_URL: process.env.TRONSCAN_API_URL,
  },

  ENVIROMENT: process.env.APPLICATION_ENVIROMENT as ApplicationEnviroment,
  CURRENT_TRON_NET: process.env.CURRENT_TRON_NET as TronNet,
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

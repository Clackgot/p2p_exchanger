import { plainToInstance } from 'class-transformer';
import { ValidateNested, validateSync, IsUrl, Matches } from 'class-validator';
import { config } from 'dotenv';
import { IsTrongridAuthKey } from './decorators';
config();

class TrongridConfig {
  @IsUrl()
  TRONGRID_MAINNET_URL: string;
  @IsUrl()
  TRONGRID_SHASTA_URL: string;
  @IsUrl()
  TRONGRID_NILE_URL: string;
  @IsTrongridAuthKey()
  TRONGRID_API_KEY: string;
}

class TronscanConfig {
  @IsUrl()
  TRONSCAN_MAINNET_URL: string;
  @IsUrl()
  TRONSCAN_SHASTA_URL: string;
  @IsUrl()
  TRONSCAN_NILE_URL: string;
}

class ApplicationConstants {
  @ValidateNested()
  TRONGRID: TrongridConfig;

  @ValidateNested()
  TRONSCAN: TronscanConfig;
}

let constants: ApplicationConstants = {
  TRONGRID: {
    TRONGRID_MAINNET_URL: process.env.TRONGRID_MAINNET_URL,
    TRONGRID_SHASTA_URL: process.env.TRONGRID_SHASTA_URL,
    TRONGRID_NILE_URL: process.env.TRONGRID_NILE_URL,
    TRONGRID_API_KEY: process.env.TRONGRID_API_KEY,
  },
  TRONSCAN: {
    TRONSCAN_MAINNET_URL: process.env.TRONSCAN_MAINNET_URL,
    TRONSCAN_SHASTA_URL: process.env.TRONSCAN_SHASTA_URL,
    TRONSCAN_NILE_URL: process.env.TRONSCAN_NILE_URL,
  },
};

constants = plainToInstance(ApplicationConstants, constants, {
  enableImplicitConversion: true,
});

const errors = validateSync(constants, { skipMissingProperties: false });
if (errors.length > 0) {
  console.log(errors.toString());
  throw new Error(errors.toString());
}

export default constants;

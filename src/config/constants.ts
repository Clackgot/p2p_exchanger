import { plainToClass, plainToInstance } from 'class-transformer';
import { IsString, IsUrl, validateSync } from 'class-validator';
import {config} from 'dotenv';
config();

class ApplicationConstants{
    @IsUrl()
    TRONGRID_MAINNET_URL: string;
    @IsUrl()
    TRONGRID_SHASTA_URL: string;
    @IsUrl()
    TRONGRID_NILE_URL: string;
    @IsString()
    TRONGRID_API_KEY: string;
    
    @IsUrl()
    TRONSCAN_MAINNET_URL: string;
    @IsUrl()
    TRONSCAN_SHASTA_URL: string;
    @IsUrl()
    TRONSCAN_NILE_URL: string;
}

const constants: ApplicationConstants = {
    TRONGRID_MAINNET_URL: process.env.TRONGRID_MAINNET_URL,
    TRONGRID_SHASTA_URL: process.env.TRONGRID_SHASTA_URL,
    TRONGRID_NILE_URL: process.env.TRONGRID_NILE_URL,
    TRONGRID_API_KEY: process.env.TRONGRID_API_KEY,

    TRONSCAN_MAINNET_URL: process.env.TRONSCAN_MAINNET_URL,
    TRONSCAN_SHASTA_URL: process.env.TRONSCAN_SHASTA_URL,
    TRONSCAN_NILE_URL: process.env.TRONSCAN_NILE_URL,
};
const validatedConfig: ApplicationConstants = plainToInstance(
    ApplicationConstants,
    constants,
    { enableImplicitConversion: true },
  );
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

export default validatedConfig;
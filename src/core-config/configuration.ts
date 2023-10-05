import { IsUrl, IsString } from 'class-validator';

export class EnvironmentVariables {
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

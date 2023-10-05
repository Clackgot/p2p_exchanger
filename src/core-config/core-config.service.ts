import { Injectable } from '@nestjs/common';
import { EnvironmentVariables } from './configuration';
import { config } from 'dotenv';
import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CoreConfigService {
  private readonly environmentVariables: EnvironmentVariables;

  getConfig(): EnvironmentVariables {
    return this.environmentVariables;
  }

  onModuleInit(): void {
    config();
    this.environmentVariables = {
      TRONGRID_MAINNET_URL: process.env.TRONGRID_MAINNET_URL,
      TRONGRID_SHASTA_URL: process.env.TRONGRID_SHASTA_URL,
      TRONGRID_NILE_URL: process.env.TRONGRID_NILE_URL,
      TRONGRID_API_KEY: process.env.TRONGRID_API_KEY,

      TRONSCAN_MAINNET_URL: process.env.TRONSCAN_MAINNET_URL,
      TRONSCAN_SHASTA_URL: process.env.TRONSCAN_SHASTA_URL,
      TRONSCAN_NILE_URL: process.env.TRONSCAN_NILE_URL,
    };

    const validatedConfig = plainToInstance(
      EnvironmentVariables,
      this.environmentVariables,
      {
        enableImplicitConversion: true,
      },
    );

    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
  }
}

import { Module } from '@nestjs/common';
import { CoreConfigService } from './core-config.service';

@Module({
  providers: [CoreConfigService],
})
export class CoreConfigModule {}

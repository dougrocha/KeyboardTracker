import { BullModuleOptions, SharedBullConfigurationFactory } from '@nestjs/bull'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  createSharedConfiguration(): BullModuleOptions {
    return {
      redis: {
        host: this.configService.get('REDIS_HOST'),
        port: this.configService.get('REDIS_PORT'),
      },
      limiter: {
        max: 100,
        duration: 1000,
        bounceBack: true,
      },
    }
  }
}

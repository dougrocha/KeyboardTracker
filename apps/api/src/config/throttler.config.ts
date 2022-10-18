import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ThrottlerOptionsFactory } from '@nestjs/throttler'

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  createThrottlerOptions() {
    return {
      ttl: this.configService.get('THROTTLE_TTL'),
      limit: this.configService.get('THROTTLE_LIMIT'),
    }
  }
}

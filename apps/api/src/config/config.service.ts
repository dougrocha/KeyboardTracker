import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppConfigService {
  static configService: ConfigService

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    AppConfigService.configService = configService
  }

  static get<T extends string>(key: string): T {
    return this.configService.get(key)
  }

  static get isDev(): boolean {
    return this.configService.get('NODE_ENV') === 'development'
  }

  static get isProd(): boolean {
    return this.configService.get('NODE_ENV') === 'production'
  }

  static get isTest(): boolean {
    return this.configService.get('NODE_ENV') === 'test'
  }
}

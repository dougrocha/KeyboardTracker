import { BullModule } from '@nestjs/bull'
import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { RouterModule } from '@nestjs/core'
import { ScheduleModule } from '@nestjs/schedule'
import { ThrottlerModule } from '@nestjs/throttler'
import { validate } from 'class-validator'
import RedisStore from 'connect-redis'
import session from 'express-session'
import { PrismaModule } from 'nestjs-prisma'
import passport from 'passport'

import { AuthModule } from './auth/auth.module.js'
import { REDIS } from './common/constants.js'
import { BullConfigService } from './config/bull.config.js'
import { AppConfigService } from './config/config.service.js'
import { PrismaConfigService } from './config/database/prisma/configuration.js'
import { routes } from './config/routes.js'
import { ThrottlerConfigService } from './config/throttler.config.js'
import { DesignerModule } from './designer/designer.module.js'
import { ProductModule } from './product/product.module.js'
import { RedisModule } from './redis/redis.module.js'
import { SnowflakeModule } from './snowflake/snowflake.module.js'
import { UserModule } from './user/user.module.js'
import { VendorModule } from './vendor/vendor.module.js'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      expandVariables: true,
      cache: true,
    }),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useClass: PrismaConfigService,
    }),
    RouterModule.register(routes),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useClass: BullConfigService,
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useClass: ThrottlerConfigService,
      inject: [ConfigService],
    }),
    SnowflakeModule.forRoot({
      options: {
        epoch: new Date('2021-01-01').getTime(),
        datacenter: 1,
      },
      global: true,
    }),
    AuthModule,
    UserModule,
    RedisModule,
    ProductModule,
    VendorModule,
    DesignerModule,
  ],
  providers: [AppConfigService],
})
export class AppModule implements NestModule {
  constructor(
    @Inject(REDIS) private readonly redis: RedisStore.Client,
    private readonly configService: ConfigService,
  ) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({
            client: this.redis,
            url: this.configService.get('REDIS_URL'),
            logErrors: true,
          }),
          secret: this.configService.get('SESSION_SECRET'),
          saveUninitialized: false,
          resave: false,
          cookie: {
            secure: AppConfigService.isProd,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*')
  }
}

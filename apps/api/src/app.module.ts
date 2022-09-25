import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PrismaModule } from 'nestjs-prisma'
import { PrismaConfigService } from './config/database/prisma/configuration'
import { validate } from './config/env.validation'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { APP_FILTER, RouterModule } from '@nestjs/core'
import { routes } from './config/routes'
import { RedisModule } from './redis/redis.module'
import { REDIS } from './common/constants'
import { KeycapsModule } from './keycaps/keycaps.module'
import { VendorsModule } from './vendors/vendors.module'
import * as session from 'express-session'
import * as RedisStore from 'connect-redis'
import * as passport from 'passport'
import { BullModule } from '@nestjs/bull'
import { BullConfigService } from './config/bull.config'
import { AppConfigService } from './config/config.service'
import { ScheduleModule } from '@nestjs/schedule'
import { ThrottlerModule } from '@nestjs/throttler'
import { ThrottlerConfigService } from './config/throttler.config'
import { SnowflakeModule } from './snowflake/snowflake.module'

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
    UsersModule,
    RedisModule,
    KeycapsModule,
    VendorsModule,
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

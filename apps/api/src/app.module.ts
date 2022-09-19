import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PrismaModule } from 'nestjs-prisma'
import { PrismaConfigService } from './config/database/prisma/configuration'
import { validate } from './config/env.validation'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { RouterModule } from '@nestjs/core'
import { routes } from './config/routes'
import { RedisModule } from './redis/redis.module'
import { REDIS } from './common/constants'
import * as session from 'express-session'
import * as RedisStore from 'connect-redis'
import * as passport from 'passport'

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
    AuthModule,
    UsersModule,
    RedisModule,
  ],
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
            secure: this.configService.get('NODE_ENV') === 'production',
            httpOnly: false,
            maxAge: 60 * 60 * 24 * 14, // 14 days
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*')
  }
}

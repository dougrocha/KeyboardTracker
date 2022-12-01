import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { PrismaService } from 'nestjs-prisma'

import { DiscordAuthController } from './controllers/discord.controller.js'
import { LocalAuthController } from './controllers/local.controller.js'
import { DiscordAuthService } from './services/discord.service.js'
import { LocalAuthService } from './services/local.service.js'
import { DiscordStrategy } from './strategies/discord.strategy.js'
import { LocalStrategy } from './strategies/local.strategy.js'

import {
  LOCAL_AUTH_SERVICE,
  DISCORD_AUTH_SERVICE,
  USER_SERVICE,
  DISCORD_USER_SERVICE,
  PRISMA_SERVICE,
} from '../common/constants.js'
import { SessionSerializer } from '../common/serializers/session.serializer.js'
import { DiscordUserService } from '../user/services/discord.service.js'
import { UserService } from '../user/services/user.service.js'

@Module({
  imports: [PassportModule.register({ session: true })],
  providers: [
    { provide: LOCAL_AUTH_SERVICE, useClass: LocalAuthService },
    { provide: DISCORD_AUTH_SERVICE, useClass: DiscordAuthService },
    { provide: USER_SERVICE, useClass: UserService },
    { provide: DISCORD_USER_SERVICE, useClass: DiscordUserService },
    { provide: PRISMA_SERVICE, useClass: PrismaService },
    LocalStrategy,
    DiscordStrategy,
    SessionSerializer,
  ],
  controllers: [LocalAuthController, DiscordAuthController],
})
export class AuthModule {}

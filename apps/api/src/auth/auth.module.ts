import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { PrismaService } from 'nestjs-prisma'

import { DiscordAuthController } from './controllers/discord.controller'
import { LocalAuthController } from './controllers/local.controller'
import { DiscordAuthService } from './services/discord.service'
import { LocalAuthService } from './services/local.service'
import { DiscordStrategy } from './strategies/discord.strategy'
import { LocalStrategy } from './strategies/local.strategy'

import {
  LOCAL_AUTH_SERVICE,
  DISCORD_USER_SERVICE,
  PRISMA_SERVICE,
  USER_SERVICE,
  DISCORD_AUTH_SERVICE,
} from '../common/constants'
import { SessionSerializer } from '../common/serializers/session.serializer'
import { DiscordUserService } from '../user/services/discord.service'
import { UserService } from '../user/services/user.service'

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

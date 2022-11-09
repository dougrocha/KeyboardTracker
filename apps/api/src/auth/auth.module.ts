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
  DISCORD_USERS_SERVICE,
  PRISMA_SERVICE,
  USERS_SERVICE,
  DISCORD_AUTH_SERVICE,
} from '../common/constants'
import { SessionSerializer } from '../common/serializers/session.serializer'
import { DiscordUsersService } from '../users/services/discord.service'
import { UsersService } from '../users/services/users.service'

@Module({
  imports: [PassportModule.register({ session: true })],
  providers: [
    { provide: LOCAL_AUTH_SERVICE, useClass: LocalAuthService },
    { provide: DISCORD_AUTH_SERVICE, useClass: DiscordAuthService },
    { provide: USERS_SERVICE, useClass: UsersService },
    { provide: DISCORD_USERS_SERVICE, useClass: DiscordUsersService },
    { provide: PRISMA_SERVICE, useClass: PrismaService },
    LocalStrategy,
    DiscordStrategy,
    SessionSerializer,
  ],
  controllers: [LocalAuthController, DiscordAuthController],
})
export class AuthModule {}

import { Module } from '@nestjs/common'
import {
  AUTH_SERVICE,
  DISCORD_USERS_SERVICE,
  PRISMA_SERVICE,
  USERS_SERVICE,
} from '../common/constants'
import { UsersService } from '../users/services/users.service'
import { AuthService } from './auth.service'
import { LocalStrategy } from './strategies/local.strategy'
import { AuthController } from './controllers/auth.controller'
import { PrismaService } from 'nestjs-prisma'
import { PassportModule } from '@nestjs/passport'
import { SessionSerializer } from '../common/serializers/session.serializer'
import { DiscordController } from './controllers/discord.controller'
import { DiscordUsersService } from '../users/services/discord.service'
import { DiscordStrategy } from './strategies/discord.strategy'

@Module({
  imports: [PassportModule.register({ session: true })],
  providers: [
    { provide: AUTH_SERVICE, useClass: AuthService },
    { provide: USERS_SERVICE, useClass: UsersService },
    { provide: DISCORD_USERS_SERVICE, useClass: DiscordUsersService },
    { provide: PRISMA_SERVICE, useClass: PrismaService },
    LocalStrategy,
    DiscordStrategy,
    SessionSerializer,
  ],
  controllers: [AuthController, DiscordController],
})
export class AuthModule {}

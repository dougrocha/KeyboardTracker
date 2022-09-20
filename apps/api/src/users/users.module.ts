import { Module } from '@nestjs/common'
import {
  DISCORD_USERS_SERVICE,
  PRISMA_SERVICE,
  USERS_SERVICE,
  REDDIT_USERS_SERVICE,
} from '../common/constants'
import { UsersService } from './services/users.service'
import { UsersController } from './users.controller'
import { PrismaService } from 'nestjs-prisma'
import { DiscordUsersService } from './services/discord.service'

@Module({
  providers: [
    { provide: USERS_SERVICE, useClass: UsersService },
    { provide: PRISMA_SERVICE, useClass: PrismaService },
    { provide: DISCORD_USERS_SERVICE, useClass: DiscordUsersService },
  ],
  exports: [{ provide: USERS_SERVICE, useClass: UsersService }],
  controllers: [UsersController],
})
export class UsersModule {}

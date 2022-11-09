import { Inject, Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

import { PRISMA_SERVICE, SNOWFLAKE_SERVICE } from '../../common/constants'
import { SnowflakeService } from '../../snowflake/snowflake.module'
import { CreateDiscordUserDto } from '../dto/create-discord-user.dto'
import { UpdateDiscordUserDto } from '../dto/update-discord-user.dto'

@Injectable()
export class DiscordUsersService {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaClient,
    @Inject(SNOWFLAKE_SERVICE) private readonly snowflake: SnowflakeService,
  ) {}

  async findUserByDiscordId(discordId: string) {
    return await this.prisma.discordIdentity.findUnique({
      where: { discordId },
      include: { user: true },
    })
  }

  /**
   * Find a user by their user id
   * @param id User ID
   * @returns User's Discord Identity without token fields or id
   */
  async findUser(id: string) {
    return await this.prisma.discordIdentity.findUnique({
      where: { id },
    })
  }

  async create(discordUser: CreateDiscordUserDto) {
    return await this.prisma.discordIdentity.create({
      data: {
        ...discordUser,
        user: {
          connectOrCreate: {
            where: {
              email: discordUser.email,
            },
            create: {
              id: this.snowflake.nextId(),
              email: discordUser.email,
              username: discordUser.username,
            },
          },
        },
      },
    })
  }

  async update(id: string, discordUser: UpdateDiscordUserDto) {
    return await this.prisma.discordIdentity.update({
      where: { id },
      data: discordUser,
    })
  }

  async delete(id: string) {
    return await this.prisma.discordIdentity.delete({ where: { id } })
  }
}

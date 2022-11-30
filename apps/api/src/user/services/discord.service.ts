import { PrismaClient, DiscordIdentity } from '@meka/database'
import { MaybePaginated, PaginatedResults, PaginationParams } from '@meka/types'
import { Inject, Injectable } from '@nestjs/common'

import { PRISMA_SERVICE, SNOWFLAKE_SERVICE } from '../../common/constants'
import BaseService from '../../common/interfaces/base-service.interface'
import { SnowflakeService } from '../../snowflake/snowflake.module'
import { CreateDiscordUserDto } from '../dto/create-discord-user.dto'
import { UpdateDiscordUserDto } from '../dto/update-discord-user.dto'

@Injectable()
export class DiscordUserService implements BaseService<DiscordIdentity> {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaClient,
    @Inject(SNOWFLAKE_SERVICE) private readonly snowflake: SnowflakeService,
  ) {}

  findMany(): Promise<DiscordIdentity[]>
  findMany(
    params?: PaginationParams,
  ): Promise<PaginatedResults<DiscordIdentity>>
  findMany(_params?: unknown): Promise<MaybePaginated<DiscordIdentity>> {
    throw new Error('Method not implemented. Please use `findOne` instead.')
  }

  findOne(id: string): Promise<DiscordIdentity> {
    return this.prisma.discordIdentity.findUnique({ where: { id } })
  }

  async findUserByDiscordId(discordId: string) {
    return await this.prisma.discordIdentity.findUnique({
      where: { discordId },
      include: { user: true },
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

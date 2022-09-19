import { Inject, Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PRISMA_SERVICE } from '../../common/constants'
import { CreateDiscordUserDto } from '../dto/create-discord-user.dto'
import { UpdateDiscordUserDto } from '../dto/update-discord-user.dto'

@Injectable()
export class DiscordUsersService {
  constructor(@Inject(PRISMA_SERVICE) private readonly prisma: PrismaClient) {}

  async findUserByDiscordId(discordId: string) {
    return await this.prisma.discordIdentity.findUnique({
      where: { discordId },
      include: { User: true },
    })
  }

  async findUser(id: number) {
    return await this.prisma.discordIdentity.findUnique({ where: { id } })
  }

  async create(discordUser: CreateDiscordUserDto, userId: number) {
    return await this.prisma.discordIdentity.create({
      data: {
        ...discordUser,
        User: {
          connectOrCreate: {
            where: {
              id: userId,
              email: discordUser.email,
            },
            create: {
              email: discordUser.email,
              username: discordUser.username,
            },
          },
        },
      },
    })
  }

  async update(id: number, discordUser: UpdateDiscordUserDto) {
    return await this.prisma.discordIdentity.update({
      where: { id },
      data: discordUser,
    })
  }

  async delete(id: number) {
    return await this.prisma.discordIdentity.delete({ where: { id } })
  }
}

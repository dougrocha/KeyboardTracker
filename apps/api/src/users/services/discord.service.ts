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
      include: { user: true },
    })
  }

  /**
   * Find a user by their user id
   * @param id User ID
   * @returns User's Discord Identity without token fields or id
   */
  async findUser(id: string) {
    const {
      accessToken,
      refreshToken,
      id: _id,
      ...discordUser
    } = await this.prisma.discordIdentity.findUnique({ where: { id } })
    return discordUser
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

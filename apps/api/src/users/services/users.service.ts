import { Inject, Injectable } from '@nestjs/common'
import { PrismaClient, User } from '@prisma/client'
import { PRISMA_SERVICE, SNOWFLAKE_SERVICE } from '../../common/constants'
import { SnowflakeService } from '../../snowflake/snowflake.module'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaClient,
    @Inject(SNOWFLAKE_SERVICE) private readonly snowflake: SnowflakeService,
  ) {}

  async create(user: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        id: this.snowflake.nextId(),
        ...user,
      },
    })
  }

  async update(id: string, user: UpdateUserDto) {
    return await this.prisma.user.update({ where: { id }, data: user })
  }

  async findById(id: string, password = false) {
    return await this.prisma.user.findUnique({
      where: { id },
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } })
  }

  async delete(id: string) {
    return await this.prisma.user.delete({ where: { id } })
  }

  async findFavorites(userId: string) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        favorites: { select: { id: true, createdAt: true, product: true } },
      },
    })
  }

  async addFavorite(userId: string, productId: string) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        favorites: {
          create: {
            product: {
              connect: { id: productId },
            },
          },
        },
      },
      select: {
        favorites: { select: { id: true, createdAt: true, product: true } },
      },
    })
  }

  async removeFavorite(userId: string, favoritesId: number) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        favorites: {
          delete: { id: favoritesId },
        },
      },
      select: {
        favorites: { select: { id: true, createdAt: true, product: true } },
      },
    })
  }

  async findAllConnections(userId: string) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
      select: { discord: true },
    })
  }
}

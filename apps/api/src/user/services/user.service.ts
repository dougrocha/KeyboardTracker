import { PrismaClient, User } from '@meka/database'
import { MaybePaginated, PaginatedResults, PaginationParams } from '@meka/types'
import { Inject, Injectable } from '@nestjs/common'

import { PRISMA_SERVICE, SNOWFLAKE_SERVICE } from '../../common/constants'
import BaseService from '../../common/interfaces/base-service.interface'
import { SnowflakeService } from '../../snowflake/snowflake.module'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'

@Injectable()
export class UserService implements BaseService<User> {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaClient,
    @Inject(SNOWFLAKE_SERVICE) private readonly snowflake: SnowflakeService,
  ) {}

  findMany(): Promise<User[]>
  findMany(params?: PaginationParams): Promise<PaginatedResults<User>>
  findMany(_params?: unknown): Promise<MaybePaginated<User>> {
    throw new Error('Method not implemented.')
  }

  findOne(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } })
  }

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

  async delete(id: string) {
    return await this.prisma.user.delete({ where: { id } })
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } })
  }

  async findUserAvatar(userId: string) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
      select: { avatar: true },
    })
  }

  async findUserFavorites(
    userId: string,
    checkPrivate = false,
    pagination?: PaginationParams,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { isFavoritesPrivate: true },
    })

    if (user.isFavoritesPrivate && checkPrivate) {
      return []
    }

    if (pagination)
      return await this.prisma.user
        .findUnique({ where: { id: userId } })
        .favorites({
          include: { product: true },
          skip: (pagination.page - 1) * pagination.perPage,
          take: pagination.perPage,
        })

    return await this.prisma.user
      .findUnique({ where: { id: userId } })
      .favorites({
        include: { product: true },
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

  async findUserConnections(userId: string) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
      // So far only discord is support, must append to this list in case of new services
      select: { discord: true },
    })
  }
}
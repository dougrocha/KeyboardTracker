import { Inject, Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

import { CreateDesignerDto } from './dtos/create-designer'
import { UpdateDesignerDto } from './dtos/update-designer.dto'

import { PRISMA_SERVICE, SNOWFLAKE_SERVICE } from '../common/constants'
import { PaginationParams } from '../product/dtos/queries/pagination-params.dto'
import { SnowflakeService } from '../snowflake/snowflake.module'

@Injectable()
export class DesignerService {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaClient,
    @Inject(SNOWFLAKE_SERVICE) private readonly snowflake: SnowflakeService,
  ) {}

  async create(userId: string, createDesignerDto: CreateDesignerDto) {
    return this.prisma.designer.create({
      data: {
        id: this.snowflake.nextId(),
        username: createDesignerDto.username,
        name: createDesignerDto.name,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
  }

  async findMany({ page, perPage }: PaginationParams) {
    return this.prisma.designer.findMany({
      skip: (page || 1 - 1) * (perPage || 10),
      take: perPage || 10,
    })
  }

  async findById(designerId: string) {
    return this.prisma.designer.findUnique({
      where: {
        id: designerId,
      },
    })
  }

  async findByUserId(userId: string) {
    return this.prisma.designer.findUnique({
      where: {
        userId,
      },
    })
  }

  async update(
    id: string,
    {
      name,
      discordServerUrl,
      redditUsername,
      twitterHandle,
      username,
      avatarUrl,
      bannerUrl,
    }: UpdateDesignerDto,
  ) {
    return this.prisma.designer.update({
      where: {
        id: id,
      },
      data: {
        username,
        name,
        discordServerUrl,
        redditUsername,
        twitterHandle,
        avatarUrl,
        bannerUrl,
      },
    })
  }

  async delete(id: string) {
    return this.prisma.designer.delete({
      where: {
        id: id,
      },
    })
  }

  async getProducts(
    designerId: string,
    { page = 1, perPage = 10 }: PaginationParams,
  ) {
    return this.prisma
      .$transaction([
        this.prisma.productDesigner.findMany({
          where: {
            designerId,
          },
          skip: (page - 1) * perPage,
          take: perPage,
          include: {
            product: true,
          },
        }),
        this.prisma.productDesigner.count({
          where: {
            designerId,
          },
        }),
      ])
      .then(([products, count]) => {
        return {
          products: products.map((product) => product.product),
          count,
        }
      })
  }
}

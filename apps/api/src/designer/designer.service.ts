import { Designer, PrismaClient } from '@meka/database'
import { PaginationParams, PaginatedResults, MaybePaginated } from '@meka/types'
import { Inject, Injectable } from '@nestjs/common'

import { CreateDesignerDto } from './dtos/create-designer.js'
import { UpdateDesignerDto } from './dtos/update-designer.dto.js'

import {
  PRISMA_SERVICE,
  PRODUCT_SERVICE,
  SNOWFLAKE_SERVICE,
} from '../common/constants.js'
import BaseService from '../common/interfaces/base-service.interface.js'
import { CreateProductDto } from '../product/dtos/create-product.dto.js'
import { UpdateProductDto } from '../product/dtos/update-product.dto.js'
import { ProductService } from '../product/services/product.service.js'
import { SnowflakeService } from '../snowflake/snowflake.module.js'

@Injectable()
export class DesignerService implements BaseService<Designer> {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaClient,
    @Inject(SNOWFLAKE_SERVICE) private readonly snowflake: SnowflakeService,
    @Inject(PRODUCT_SERVICE) private readonly productService: ProductService,
  ) {}

  create(data: CreateDesignerDto) {
    return this.prisma.designer.create({
      data: {
        id: this.snowflake.nextId(),
        username: data.username,
        name: data.name,
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    })
  }

  findMany(): Promise<Designer[]>
  findMany(params?: PaginationParams): Promise<PaginatedResults<Designer>>
  findMany(params?: unknown): Promise<MaybePaginated<Designer>> {
    if (params) {
      const { page = 1, perPage = 10 } = params as PaginationParams
      return this.prisma.designer.findMany({
        skip: (page - 1) * perPage,
        take: perPage,
      })
    }

    return this.prisma.designer.findMany()
  }

  findOne(id: string): Promise<Designer> {
    return this.prisma.designer.findUnique({
      where: {
        id,
      },
    })
  }

  async findUserDesigner(userId: string) {
    return this.prisma.designer.findUnique({
      where: {
        userId,
      },
    })
  }

  update(id: string, data: UpdateDesignerDto) {
    return this.prisma.designer.update({
      where: {
        id: id,
      },
      data: {
        username: data.username,
        name: data.name,
      },
    })
  }

  delete(id: string) {
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

  async validateUserDesigner(userId: string, designerId: string) {
    return this.prisma.designer.findFirst({
      where: {
        id: designerId,
        userId,
      },
    })
  }

  createProduct(designerId: string, productData: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        ...productData,
        id: this.snowflake.nextId(),
        designers: {
          create: {
            designerId,
          },
        },
      },
    })
  }

  async updateProduct(
    designerId: string,
    { id: productId, ...productData }: UpdateProductDto,
  ) {
    const product = await this.productService.findOne(productId)

    if (!product) {
      throw new Error('Product not found')
    }

    const designer = await this.findOne(designerId)

    if (!designer) {
      throw new Error('Designer not found')
    }

    const productDesigner = await this.prisma.productDesigner.findFirst({
      where: {
        designerId,
        productId,
      },
    })

    if (!productDesigner) {
      throw new Error('Product not found')
    }

    console.log(productData)

    return this.prisma.product.update({
      where: {
        id: productId,
      },
      data: productData,
    })
  }
}

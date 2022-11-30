import { GroupBuyStatus, Prisma, Product } from '@meka/database'
import { PaginationParams, PaginatedResults, MaybePaginated } from '@meka/types'
import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

import { PRISMA_SERVICE, SNOWFLAKE_SERVICE } from '../../common/constants'
import BaseService from '../../common/interfaces/base-service.interface'
import { SnowflakeService } from '../../snowflake/snowflake.module'
import { CreateProductDto } from '../dtos/create-product.dto'
import { ProductSearchQuery } from '../dtos/queries/product-search-query.dto'
import { UpdateProductDto } from '../dtos/update-product.dto'

@Injectable()
export class ProductService implements BaseService<Product> {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService,
    @Inject(SNOWFLAKE_SERVICE) private readonly snowflake: SnowflakeService,
  ) {}

  /**
   * Creates a new product with snowflake id
   */
  async create(data: CreateProductDto) {
    return await this.prisma.product.create({
      data: {
        id: this.snowflake.nextId(),
        ...data,
      },
    })
  }

  /**
   * Updates a product
   */
  async update(id: string, data: UpdateProductDto) {
    return await this.prisma.product.update({
      where: { id },
      data,
    })
  }

  /**
   * Deletes a product
   */
  async delete(id: string) {
    return await this.prisma.product.delete({
      where: { id },
    })
  }

  /**
   * Returns products
   *
   * @returns Product[]
   */
  findMany(): Promise<Product[]>
  findMany(params?: PaginationParams): Promise<PaginatedResults<Product>>
  async findMany(params?: unknown): Promise<MaybePaginated<Product>> {
    if (!params) {
      return this.prisma.product.findMany()
    }

    const { perPage, page = 1 } = params as PaginationParams

    return this.prisma
      .$transaction([
        this.prisma.product.findMany({
          skip: (page - 1) * perPage,
          take: perPage,
        }),
        this.prisma.product.count(),
      ])
      .then(([products, count]) => ({
        data: products,
        count,
      }))
  }

  // Find all products ids with pagination
  async findAllIds(params?: PaginationParams): Promise<Pick<Product, 'id'>[]> {
    return await this.prisma.product.findMany({
      select: { id: true },
      take: params?.perPage,
      skip: params?.page ? (params.page - 1) * params.perPage : undefined,
    })
  }

  /**
   * Returns a product by id
   */
  async findOne(
    id: string,
    include: Prisma.ProductInclude = {
      keyboard: true,
      keycapSet: true,
      vendors: {
        include: { vendor: true },
      },
      designers: true,
      images: true,
    },
  ) {
    return await this.prisma.product.findUnique({
      where: { id },
      include,
    })
  }

  /**
   * Searches for products
   */
  async search({
    select = { id: true, name: true, description: true },
    search,
    pagination: { page = 1, perPage = 5 },
  }: {
    select?: Prisma.ProductSelect
    search?: ProductSearchQuery
    pagination?: PaginationParams
  }) {
    const formattedSearch = search.search.replace(/ /g, '|')
    return await this.prisma.product.findMany({
      select,
      where: {
        brand: { contains: search.brand },
        status: search.status,
        type: search.type,
        keycapSet: {
          material: search.material ? { contains: search.material } : undefined,
        },
        vendors: {
          some: {
            vendor: { name: { contains: search.vendor, mode: 'insensitive' } },
          },
        },
      },
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        _relevance: {
          fields: [
            'name',
            'description',
            'brand',
            'estimatedDeliveryYear',
            'layout',
          ],
          search: formattedSearch,
          sort: 'desc',
        },
      },
    })
  }

  async findManyWithStatus(status: GroupBuyStatus, params?: PaginationParams) {
    console.log('status', status)

    if (params) {
      const { perPage, page = 1 } = params
      return this.prisma.product.findMany({
        where: { status },
        take: perPage,
        skip: (page - 1) * perPage,
      })
    }

    return this.prisma.product.findMany({ where: { status } })
  }

  async findProductVendorsByProductId(productId: string) {
    return await this.prisma.productVendor.findMany({
      where: { productId },
      include: { vendor: true },
    })
  }

  async findDesignerByProductId(productId: string) {
    return await this.prisma.product.findUnique({
      where: { id: productId },
      include: { designers: true },
    })
  }

  async findByProductAndDesignerId(productId: string, designerId: string) {
    return await this.prisma.productDesigner.findFirst({
      where: {
        productId,
        designerId,
      },
    })
  }
}

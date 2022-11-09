import { Inject, Injectable } from '@nestjs/common'
import { GroupBuyStatus, Prisma } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'

import { PRISMA_SERVICE, SNOWFLAKE_SERVICE } from '../../common/constants'
import { SnowflakeService } from '../../snowflake/snowflake.module'
import { CreateProductDto } from '../dtos/create-product.dto'
import { PaginationParams } from '../dtos/queries/pagination-params.dto'
import { ProductSearchQuery } from '../dtos/queries/product-search-query.dto'
import { UpdateProductDto } from '../dtos/update-product.dto'

@Injectable()
export class ProductsService {
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

  async findMany({
    select,
    take,
    skip,
  }: {
    select?: Prisma.ProductSelect
    take?: number
    skip?: number
  }) {
    return await this.prisma.product.findMany({ select, take, skip })
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
      designer: true,
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
    pagination,
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
      take: pagination.take,
      skip: pagination.skip,
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

  /**
   * Returns products with a specific status
   * @param status Prisma.GroupBuyStatus
   */
  async findByStatus(
    status: GroupBuyStatus,
    { take, skip }: PaginationParams,
    orderBy?: Prisma.ProductOrderByWithRelationAndSearchRelevanceInput,
  ) {
    return await this.prisma.product.findMany({
      where: { status },
      take,
      skip,
      orderBy,
    })
  }

  /**
   * Returns products with a specific type
   * @param id Product id
   * @returns Product
   */
  async findProductVendors(id: string) {
    return await this.prisma.productVendor.findMany({
      where: { productId: id },
      include: { vendor: true },
    })
  }
}

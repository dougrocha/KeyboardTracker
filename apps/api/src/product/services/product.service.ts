import { GroupBuyStatus, Prisma, Product } from '@meka/database'
import { PaginationParams, PaginatedResults, MaybePaginated } from '@meka/types'
import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

import { PRISMA_SERVICE, SNOWFLAKE_SERVICE } from '../../common/constants.js'
import BaseService from '../../common/interfaces/base-service.interface.js'
import { SnowflakeService } from '../../snowflake/snowflake.module.js'
import { CreateProductDto } from '../dtos/create-product.dto.js'
import { ProductSearchQuery } from '../dtos/queries/product-search-query.dto.js'
import { UpdateProductDto } from '../dtos/update-product.dto.js'

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
  async findMany({
    page,
    perPage,
  }: PaginationParams): Promise<PaginatedResults<Product>> {
    if (!page || !perPage) {
      const products = await this.prisma.product.findMany()
      return {
        data: products,
        count: products.length,
      }
    }

    return this.prisma
      .$transaction([
        this.prisma.product.findMany({
          take: perPage,
          skip: (page - 1) * perPage,
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

  async findManyWithStatus(
    status: GroupBuyStatus,
    { page, perPage }: PaginationParams,
  ): Promise<MaybePaginated<Product>> {
    if (page && perPage) {
      return this.prisma
        .$transaction([
          this.prisma.product.findMany({
            where: { status },
            take: perPage,
            skip: (page - 1) * perPage,
          }),
          this.prisma.product.count({
            where: { status },
          }),
        ])
        .then(([products, count]) => ({
          data: products,
          count,
        }))
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

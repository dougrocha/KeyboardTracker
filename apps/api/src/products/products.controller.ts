import { Controller, Get, Inject, Query, Body } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { KEYCAPS_SERVICE, PRISMA_SERVICE } from '../common/constants'
import { KeycapsService } from '../keycaps/keycaps.service'
import { PaginationParams } from './dtos/pagination-params.dto'
import { ProductSearchQuery } from './dtos/product-search-query.dto'

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(KEYCAPS_SERVICE) private readonly keycapsService: KeycapsService,
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService,
  ) {}

  @Get()
  async findMany(@Query() { take, skip }: PaginationParams) {
    const keycaps = await this.keycapsService.findMany({
      take,
      skip,
    })
    return keycaps
  }

  @Get('search')
  async search(
    @Body()
    { brand, material, status, type, vendor, search }: ProductSearchQuery,
    @Query() { take, skip }: PaginationParams,
  ) {
    const products = await this.prisma.product.findMany({
      select: {
        id: true,
        name: true,
        brand: true,
        type: true,
        status: true,
        price: true,
        description: true,
        keycapSet: true,
        vendors: {
          include: {
            vendor: true,
          },
        },
      },
      where: {
        brand: { search: brand, mode: 'insensitive' },
        status: status,
        type: type,
        description: { search },
        keycapSet: {
          material: { contains: material, mode: 'insensitive' },
        },
        vendors: {
          some: {
            vendor: {
              name: { contains: vendor, mode: 'insensitive' },
            },
          },
        },
      },
      take,
      skip,
    })

    return { products, count: products.length }
  }

  /**
   * Should only be used by static generation tool
   */
  @Get('ids')
  async findAllIds(@Query() { take, skip }: PaginationParams) {
    const keycaps = await this.keycapsService.findMany({
      select: { id: true },
      take,
      skip,
    })

    // TODO: Implement other services
    // const keyboards = await this.keyboardsService.findMany({
    //   select: id ? { id } : undefined,
    //   take,
    //   skip,
    // })

    // const switches = await this.switchesService.findMany({
    //   select: id ? { id } : undefined,
    //   take,
    //   skip,
    // })

    // return [...keycaps, ...keyboards, ...switches]

    return keycaps
  }
}

import {
  Controller,
  Get,
  Inject,
  Query,
  ParseBoolPipe,
  Param,
  ParseEnumPipe,
} from '@nestjs/common'
import { GroupBuyStatus } from '@prisma/client'

import { PRODUCTS_SERVICE } from '../../common/constants'
import { DateSortQuery } from '../dtos/queries/date-sort-query.dto'
import { PaginationParams } from '../dtos/queries/pagination-params.dto'
import { ProductSearchQuery } from '../dtos/queries/product-search-query.dto'
import { ProductsService } from '../services/products.service'

@Controller()
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE) private readonly productsService: ProductsService,
  ) {}

  /**
   * GET /products/all
   *
   * Returns all products
   *
   * @param param0
   * @returns
   */
  @Get('all')
  async findMany(
    @Query() { take, skip }: PaginationParams,
    @Query('products', ParseBoolPipe) products: boolean,
  ) {
    return await this.productsService.findMany({
      select: products ? undefined : { id: true },
      take,
      skip,
    })
  }

  /**
   * GET /products/:id
   * @param id Product id
   * @returns Returns a single product
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(id)
  }

  /**
   * GET /products/:id/vendors
   * @param id Product id
   * @returns Product with vendors
   */
  @Get(':id/vendors')
  async findAllVendors(@Param('id') id: string) {
    return await this.productsService.findProductVendors(id)
  }

  /**
   * GET /products
   *
   * Search for products by name, description, brand, vendor, material, status, and type
   * @param search Search query
   * @param pagination Pagination params
   * @returns Products
   */
  @Get()
  async search(
    @Query() search: ProductSearchQuery,
    @Query() pagination: PaginationParams,
  ) {
    return await this.productsService.search({
      pagination,
      search,
    })
  }

  /**
   * GET /products/status/:status
   * @param status Product status
   * @param pagination Pagination params
   * @returns Products
   *
   * No need to return length due to the requirement of pagination
   *
   */
  @Get('status/:status')
  async findByStatus(
    @Param('status', new ParseEnumPipe(GroupBuyStatus)) status: GroupBuyStatus,
    @Query() pagination: PaginationParams,
    @Query() dateSort: DateSortQuery,
  ) {
    return await this.productsService.findByStatus(status, pagination)
  }
}

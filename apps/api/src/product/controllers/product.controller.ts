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

import { PRODUCT_SERVICE } from '../../common/constants'
import { PaginationParams } from '../dtos/queries/pagination-params.dto'
import { ProductSearchQuery } from '../dtos/queries/product-search-query.dto'
import { ProductService } from '../services/product.service'

@Controller()
export class ProductController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productService: ProductService,
  ) {}

  /**
   * GET /products/all
   *
   * Returns all products
   *
   * @param param0
   * @returns
   */
  @Get()
  async findMany(
    @Query() { perPage, page }: PaginationParams,
    @Query('products', ParseBoolPipe) products: boolean,
  ) {
    return await this.productService.findMany({
      select: products ? undefined : { id: true },
      skip: page ? (page - 1) * perPage : undefined,
      take: perPage,
    })
  }

  /**
   * GET /products/:id
   * @param id Product id
   * @returns Returns a single product
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(id)
  }

  /**
   * GET /products/:id/vendors
   * @param id Product id
   * @returns Product with vendors
   */
  @Get(':id/vendors')
  async findAllVendors(@Param('id') id: string) {
    return await this.productService.findProductVendors(id)
  }

  /**
   * GET /products
   *
   * Search for products by name, description, brand, vendor, material, status, and type
   * @param search Search query
   * @param pagination Pagination params
   * @returns Products
   */
  @Get('search')
  async search(
    @Query() search: ProductSearchQuery,
    @Query() pagination: PaginationParams,
  ) {
    return await this.productService.search({
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
  ) {
    return await this.productService.findByStatus(status, pagination)
  }
}

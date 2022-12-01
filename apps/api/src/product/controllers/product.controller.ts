import { GroupBuyStatus } from '@meka/database'
import {
  Controller,
  Get,
  Inject,
  Query,
  ParseBoolPipe,
  Param,
  ParseEnumPipe,
  Body,
} from '@nestjs/common'

import { PRODUCT_SERVICE } from '../../common/constants.js'
import { PaginationParams } from '../../common/dto/pagination-params.dto.js'
import { ProductSearchQuery } from '../dtos/queries/product-search-query.dto.js'
import { ProductService } from '../services/product.service.js'

@Controller()
export class ProductController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productService: ProductService,
  ) {}

  /**
   * GET /product
   *
   * Returns all products
   *
   * @param param0
   * @returns
   */
  @Get()
  async findMany(
    @Query() pagination: PaginationParams,
    @Body('product', ParseBoolPipe) product: boolean,
  ) {
    if (product) {
      return await this.productService.findMany(pagination)
    }

    return await this.productService.findAllIds(pagination)
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
    return await this.productService.findProductVendorsByProductId(id)
  }

  /**
   * GET /products/search/v1
   *
   * Search for products by name, description, brand, vendor, material, status, and type
   * @param search Search query
   * @param pagination Pagination params
   * @returns Products
   */
  @Get('search/v1')
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
    return await this.productService.findManyWithStatus(status, pagination)
  }
}

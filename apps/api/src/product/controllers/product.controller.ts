import { createReadStream } from 'fs'
import { access, constants } from 'fs/promises'

import { GroupBuyStatus } from '@meka/database'
import {
  Controller,
  Get,
  Inject,
  Query,
  Param,
  ParseEnumPipe,
  HttpException,
  Res,
  HttpStatus,
  HttpCode,
  StreamableFile,
} from '@nestjs/common'
import { Response } from 'express'

import { IMAGE_SERVICE, PRODUCT_SERVICE } from '../../common/constants.js'
import { PaginationParams } from '../../common/dto/pagination-params.dto.js'
import { ImageNotFoundException } from '../../common/exceptions/imageNotFound.exception.js'
import { ImageService } from '../../image/image.service.js'
import { FindManyProductsDto } from '../dtos/find-many-products.dto.js'
import { ProductSearchQuery } from '../dtos/queries/product-search-query.dto.js'
import { ProductService } from '../services/product.service.js'

@Controller()
export class ProductController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productService: ProductService,
    @Inject(IMAGE_SERVICE) private readonly imagesService: ImageService,
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
  async findMany(@Query() { product, ...pagination }: FindManyProductsDto) {
    if (product) return await this.productService.findMany(pagination)
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

  /**
   * GET /products/:id/image/:image_id
   */
  @Get(':id/image/:image_id')
  @HttpCode(HttpStatus.OK)
  async findImageById(
    @Param('id') productId: string,
    @Param('image_id') imageId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!productId || !imageId)
      throw new HttpException('Product id and image id are required', 400)

    const path = this.imagesService.joinFilePath(productId, imageId) + '.webp'

    return await access(path, constants.F_OK | constants.R_OK)
      .then(() => {
        res.set('Content-Type', 'image/webp')
        res.header('Content-Disposition', `inline, filename=${imageId}.webp`)
        return new StreamableFile(createReadStream(path))
      })
      .catch(() => {
        throw new ImageNotFoundException()
      })
  }
}

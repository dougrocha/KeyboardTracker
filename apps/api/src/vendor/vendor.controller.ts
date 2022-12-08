import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Query,
  Post,
  NotFoundException,
  UseGuards,
} from '@nestjs/common'

import { AddVendorProductDto } from './dto/add-vendor-product.dto.js'
import { CreateVendorDto } from './dto/create-vendor.dto.js'
import { UpdateVendorProductDto } from './dto/update-vendor-product.dto.js'
import { UpdateVendorDto } from './dto/update-vendor.dto.js'
import { VendorService } from './vendor.service.js'

import { VENDOR_SERVICE } from '../common/constants.js'
import { VendorRoles } from '../common/decorators/roles.decorator.js'
import { PaginationParams } from '../common/dto/pagination-params.dto.js'
import { AuthenticatedGuard } from '../common/guards/authenticated.guard.js'
import { VendorOwner } from '../common/guards/vendor-owner.guard.js'

@Controller('vendor')
export class VendorController {
  constructor(
    @Inject(VENDOR_SERVICE) private readonly vendorService: VendorService,
  ) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    const vendor = await this.vendorService.findById(id)
    if (!vendor) {
      throw new NotFoundException('User not found')
    }
    return vendor
  }

  @Post()
  async create(@Body() createVendorBody: CreateVendorDto) {
    return await this.vendorService.create(createVendorBody)
  }

  @Patch(':id')
  @VendorRoles('ADMIN')
  async update(
    @Param('id') id: string,
    @Body() updateVendorBody: UpdateVendorDto,
  ) {
    return await this.vendorService.update(id, updateVendorBody)
  }

  @Delete(':id')
  @VendorRoles('ADMIN')
  async delete(@Param('id') id: string) {
    return await this.vendorService.delete(id)
  }

  @Get()
  async findMany(@Query() pagination: PaginationParams) {
    return await this.vendorService.findMany(pagination)
  }

  @Get('country/:country')
  async findAllByCountry(@Param('country') country: string) {
    return await this.vendorService.findVendorsByCountry(country)
  }

  @Get(':id/products')
  async findAllProducts(
    @Param('id') id: string,
    @Query() pagination: PaginationParams,
  ) {
    return await this.vendorService.findVendorProducts(id, pagination)
  }

  @Post(':id/products')
  @VendorRoles('ADMIN')
  @UseGuards(AuthenticatedGuard, VendorOwner)
  async addProduct(
    @Param('id') vendorId: string,
    @Body() product: AddVendorProductDto,
  ) {
    const newProduct = await this.vendorService.addVendorProduct({
      ...product,
      vendorId,
    })
    return {
      product: newProduct.id,
    }
  }

  @Patch(':id/products/:productId')
  @VendorRoles('ADMIN')
  @UseGuards(AuthenticatedGuard, VendorOwner)
  async updateProduct(
    @Param('id') vendorId: string,
    @Param('productId') productId: string,
    @Body() product: UpdateVendorProductDto,
  ) {
    const updatedProduct = await this.vendorService.updateVendorProduct(
      vendorId,
      productId,
      product,
    )
    return {
      message: 'Product updated successfully',
      product: updatedProduct.id,
      vendorId: vendorId,
    }
  }
}

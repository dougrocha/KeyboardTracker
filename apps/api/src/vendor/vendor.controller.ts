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
} from '@nestjs/common'

import { CreateVendorDto } from './dto/create-vendor.dto'
import { UpdateVendorDto } from './dto/update-vendor.dto'
import { VendorService } from './vendor.service'

import { VENDOR_SERVICE } from '../common/constants'
import { PaginationParams } from '../common/dto/pagination-params.dto'

@Controller('vendor')
export class VendorController {
  constructor(
    @Inject(VENDOR_SERVICE) private readonly vendorService: VendorService,
  ) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.vendorService.findById(id)
  }

  @Post(':id')
  async create(@Body() createVendorBody: CreateVendorDto) {
    return await this.vendorService.create(createVendorBody)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVendorBody: UpdateVendorDto,
  ) {
    return await this.vendorService.update(id, updateVendorBody)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.vendorService.delete(id)
  }

  @Get()
  async findMany() {
    return await this.vendorService.findMany()
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
}

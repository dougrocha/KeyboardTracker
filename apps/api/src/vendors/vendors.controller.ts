import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common'

import { CreateVendorDto } from './dto/create-vendor.dto'
import { UpdateVendorDto } from './dto/update-vendor.dto'
import { VendorsService } from './vendors.service'

import { VENDORS_SERVICE } from '../common/constants'

@Controller('vendors')
export class VendorsController {
  constructor(
    @Inject(VENDORS_SERVICE) private readonly vendorsService: VendorsService,
  ) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.vendorsService.findById(id)
  }

  @Post(':id')
  async create(@Body() createVendorBody: CreateVendorDto) {
    return await this.vendorsService.create(createVendorBody)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVendorBody: UpdateVendorDto,
  ) {
    return await this.vendorsService.update(id, updateVendorBody)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.vendorsService.delete(id)
  }

  @Get()
  async findMany() {
    return await this.vendorsService.findMany()
  }

  @Get('country/:country')
  async findAllByCountry(@Param('country') country: string) {
    return await this.vendorsService.findAllByCountry(country)
  }

  @Get(':id/products')
  async findAllProducts(@Param('id') id: string) {
    return await this.vendorsService.findAllProducts(id)
  }
}

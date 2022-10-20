import { Controller, Get, Inject, Param } from '@nestjs/common'
import { VENDORS_SERVICE } from '../common/constants'
import { VendorsService } from './vendors.service'

@Controller('vendors')
export class VendorsController {
  constructor(
    @Inject(VENDORS_SERVICE) private readonly vendorsService: VendorsService,
  ) {}

  @Get(':id/products')
  async findAllProducts(@Param('id') id: string) {
    return await this.vendorsService.findAllProducts(id)
  }
}

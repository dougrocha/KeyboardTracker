import { Controller, Inject } from '@nestjs/common'
import { VENDORS_SERVICE } from '../common/constants'
import { VendorsService } from './vendors.service'

@Controller('vendors')
export class VendorsController {
  constructor(
    @Inject(VENDORS_SERVICE) private readonly vendorsService: VendorsService,
  ) {}
}

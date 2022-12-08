import { OmitType, PartialType } from '@nestjs/mapped-types'

import { AddVendorProductDto } from './add-vendor-product.dto'

export class UpdateVendorProductDto extends OmitType(
  PartialType(AddVendorProductDto),
  ['productId', 'vendorId'],
) {}

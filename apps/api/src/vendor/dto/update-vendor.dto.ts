import { PartialType } from '@nestjs/mapped-types'
import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'

import { CreateVendorDto } from './create-vendor.dto.js'

export class UpdateVendorDto extends PartialType(CreateVendorDto) {
  // This verified field should be changed by the user
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => (value === 'true' ? true : false))
  verified?: boolean
}

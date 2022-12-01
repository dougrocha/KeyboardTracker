import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsString } from 'class-validator'

import { CreateProductDto } from './create-product.dto.js'

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsNotEmpty()
  @IsString()
  id: string
}

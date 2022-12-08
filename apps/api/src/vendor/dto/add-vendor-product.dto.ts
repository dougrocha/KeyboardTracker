import { AddVendorProduct } from '@meka/types'
import { Transform } from 'class-transformer'
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'

export class AddVendorProductDto implements Partial<AddVendorProduct> {
  @IsOptional()
  @IsString()
  vendorId?: string

  @IsNotEmpty()
  @IsString()
  productId: string

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @Min(0)
  @IsNumber()
  price: number
}

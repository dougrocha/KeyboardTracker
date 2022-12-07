import { AddVendorProduct } from '@meka/types'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class AddVendorProductDto implements AddVendorProduct {
  @IsNotEmpty()
  @IsString()
  vendorId: string

  @IsNotEmpty()
  @IsString()
  productId: string

  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  price: number
}

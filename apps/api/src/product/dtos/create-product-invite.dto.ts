import { CreateProductInvite } from '@meka/types'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateProductInviteDto implements CreateProductInvite {
  @IsString()
  @IsNotEmpty()
  productId: string

  @IsString()
  @IsNotEmpty()
  designerId: string

  @IsString()
  @IsNotEmpty()
  creatorId: string

  @IsString()
  @IsNotEmpty()
  vendorId: string
}

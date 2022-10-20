import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateFormDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  description?: string

  @IsNotEmpty()
  @IsString()
  productId: string

  @IsNotEmpty()
  @IsString()
  createdById: string
}

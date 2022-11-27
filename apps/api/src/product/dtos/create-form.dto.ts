import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator'

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

  @IsOptional()
  @IsDate()
  startDate: Date

  @IsOptional()
  @IsDate()
  endDate: Date

  @IsNotEmpty()
  @IsString()
  createdById: string
}

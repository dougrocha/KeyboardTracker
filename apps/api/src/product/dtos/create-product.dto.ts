import {
  GroupBuyStatus,
  Prisma,
  ProductType,
  YearQuarter,
} from '@meka/database'
import { Transform } from 'class-transformer'
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinDate,
} from 'class-validator'

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  policy?: string

  @IsOptional()
  @Transform(({ value }) => (value ? value.toUpperCase() : 'UPCOMING'))
  @IsEnum(GroupBuyStatus)
  status?: GroupBuyStatus

  @IsNotEmpty()
  @IsEnum(ProductType)
  type: ProductType

  @IsOptional()
  @IsString()
  brand?: string

  @IsOptional()
  @IsString()
  layout?: string

  @IsOptional()
  @IsString()
  interestCheckUrl?: string

  @IsOptional()
  @IsString()
  groupBuyUrl?: string

  @IsOptional()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  @MinDate(new Date(), {
    message: 'Group buy start date must be in the future',
  })
  groupBuyStartDate?: Date

  @IsOptional()
  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  @MinDate(new Date(), {
    message: 'Group buy end date must be in the future',
  })
  groupBuyEndDate?: Date

  @IsString()
  @IsOptional()
  price?: string | number | Prisma.Decimal

  @IsOptional()
  @IsEnum(YearQuarter)
  estimatedDeliveryQuarter?: YearQuarter

  @IsOptional()
  @IsString()
  estimatedDeliveryYear?: string
}

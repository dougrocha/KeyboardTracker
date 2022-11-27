import { Prisma } from '@prisma/client'
import { IsEnum, IsOptional } from 'class-validator'

export class DateSortQuery {
  @IsOptional()
  @IsEnum(Prisma.SortOrder)
  groupBuyStartDate?: Prisma.SortOrder

  @IsOptional()
  @IsEnum(Prisma.SortOrder)
  groupBuyEndDate?: Prisma.SortOrder

  @IsOptional()
  @IsEnum(Prisma.SortOrder)
  orderByICStart?: Prisma.SortOrder

  @IsOptional()
  @IsEnum(Prisma.SortOrder)
  orderByICEnd?: Prisma.SortOrder
}

import { GroupBuyStatus, ProductType } from '@meka/database'
import { IsEnum, IsOptional, IsString } from 'class-validator'

import { SearchQuery } from '../../../common/dto/search-query.dto'

export class ProductSearchQuery extends SearchQuery {
  @IsString()
  @IsOptional()
  material?: string

  @IsEnum(GroupBuyStatus)
  @IsOptional()
  status?: GroupBuyStatus

  @IsEnum(ProductType)
  @IsOptional()
  type?: ProductType

  @IsString()
  @IsOptional()
  brand?: string

  @IsString()
  @IsOptional()
  vendor?: string
}

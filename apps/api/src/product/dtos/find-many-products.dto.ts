import { Transform } from 'class-transformer'
import { IsOptional, IsBoolean } from 'class-validator'

import { PaginationParams } from '../../common/dto/pagination-params.dto'

export class FindManyProductsDto extends PaginationParams {
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  product?: boolean
}

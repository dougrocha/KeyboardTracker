import { Transform } from 'class-transformer'
import { IsBoolean, IsOptional } from 'class-validator'

export class FindAllProductsDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => (value === 'true' ? true : false))
  id?: boolean

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => (value === 'true' ? true : false))
  all?: boolean
}

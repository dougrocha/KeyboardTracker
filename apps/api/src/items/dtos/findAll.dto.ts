import { Transform } from 'class-transformer'
import { IsBoolean, IsNumber, IsOptional } from 'class-validator'

export class FindAllItemsDto {
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => (value === 'true' ? true : undefined))
  id?: boolean

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? parseInt(value) : undefined))
  take?: number

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? parseInt(value) : undefined))
  skip?: number
}

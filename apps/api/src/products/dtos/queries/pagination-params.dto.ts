import { Transform } from 'class-transformer'
import { IsOptional, IsNumber } from 'class-validator'

export class PaginationParams {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? parseInt(value) : undefined))
  take?: number

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? parseInt(value) : undefined))
  skip?: number
}

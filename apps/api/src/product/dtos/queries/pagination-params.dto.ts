import { Transform } from 'class-transformer'
import { IsOptional, IsNumber, Min } from 'class-validator'

export class PaginationParams {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? parseInt(value) : undefined))
  @Min(1)
  perPage?: number

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? parseInt(value) : undefined))
  @Min(1)
  page?: number
}

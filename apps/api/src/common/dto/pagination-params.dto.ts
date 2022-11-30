import { PaginationParams as PaginationParamInterface } from '@meka/types'
import { Transform } from 'class-transformer'
import { IsOptional, IsNumber, Min } from 'class-validator'

export class PaginationParams implements PaginationParamInterface {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? parseInt(value) : 10))
  @Min(1)
  perPage?: number

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => (value ? parseInt(value) : 1))
  @Min(1)
  page?: number
}

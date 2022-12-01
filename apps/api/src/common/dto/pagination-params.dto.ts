import { PaginationParams as PaginationParamInterface } from '@meka/types'
import { Transform } from 'class-transformer'
import { IsOptional, IsNumber, Min } from 'class-validator'

export class PaginationParams implements PaginationParamInterface {
  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value) : undefined))
  @IsNumber()
  @Min(1)
  perPage?: number

  @IsOptional()
  @Transform(({ value }) => (value ? parseInt(value) : undefined))
  @IsNumber()
  @Min(1)
  page?: number
}

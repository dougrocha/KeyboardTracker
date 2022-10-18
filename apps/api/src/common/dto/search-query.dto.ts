import { IsOptional, IsString } from 'class-validator'

export class SearchQuery {
  @IsString()
  @IsOptional()
  search?: string
}

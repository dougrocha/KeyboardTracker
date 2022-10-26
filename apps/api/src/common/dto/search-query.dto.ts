import { IsNotEmpty, IsString } from 'class-validator'

export class SearchQuery {
  @IsNotEmpty()
  @IsString()
  search: string
}

import { IsNotEmpty, IsString } from 'class-validator'

export class SearchQuery {
  @IsString()
  @IsNotEmpty()
  search: string
}

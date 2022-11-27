import { Transform } from 'class-transformer'
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator'

export class CreateVendorDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string

  @IsOptional()
  @IsString()
  logoUrl?: string

  @IsOptional()
  @IsString()
  url?: string

  @IsString()
  @IsOptional()
  country?: string

  @IsBoolean()
  @Transform(({ value }) => (value === 'true' ? true : false))
  verified: boolean
}

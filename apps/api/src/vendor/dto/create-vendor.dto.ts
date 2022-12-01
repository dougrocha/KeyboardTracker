import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

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
}

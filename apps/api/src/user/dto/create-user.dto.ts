import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsOptional()
  id: string

  @IsString()
  @IsOptional()
  name?: string

  @IsEmail()
  email: string

  @IsString()
  @MinLength(8)
  password?: string

  @IsString()
  @IsOptional()
  @Length(4)
  discriminator?: string

  @IsString()
  @MinLength(3)
  username: string

  @IsString()
  @IsOptional()
  avatar?: string
}

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
  username: string
}

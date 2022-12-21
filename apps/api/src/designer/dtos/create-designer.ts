import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateDesignerDto {
  @IsOptional()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  username?: string

  @IsOptional()
  @IsString()
  userId: string

  @IsOptional()
  @IsString()
  avatarUrl?: string

  @IsOptional()
  @IsString()
  bannerUrl?: string

  @IsOptional()
  @IsString()
  twitterHandle?: string

  @IsOptional()
  @IsString()
  redditUsername?: string

  @IsOptional()
  @IsString()
  discordServerUrl?: string
}

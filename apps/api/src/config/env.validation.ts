import { plainToInstance } from 'class-transformer'
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator'

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment

  @IsNumber()
  PORT: number

  @IsString()
  SESSION_SECRET: string

  @IsString()
  APP_URL: string
  @IsString()
  CORS_ORIGIN: string

  @IsString()
  DISCORD_CLIENT_SECRET: string
  @IsString()
  DISCORD_CLIENT_ID: string
  @IsString()
  DISCORD_CALLBACK_URL: string

  @IsString()
  POSTGRES_PASSWORD: string
  @IsString()
  POSTGRES_USER: string
  @IsString()
  POSTGRES_DB: string
  @IsString()
  DATABASE_URL: string

  @IsString()
  REDIS_URL: string
  @IsString()
  REDIS_HOST: string
  @IsNumber()
  REDIS_PORT: number

  @IsString()
  UPLOADS_PATH: string
  @IsNumber()
  MAX_FILE_UPLOAD_SIZE: number
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  })
  const errors = validateSync(validatedConfig, { skipMissingProperties: false })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
  return validatedConfig
}

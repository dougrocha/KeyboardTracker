import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { PrismaClientExceptionFilter } from 'nestjs-prisma'
import { AppModule } from './app.module'
import * as session from 'express-session'
import * as passport from 'passport'
import * as createRedisStore from 'connect-redis'
import { createClient } from 'redis'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get(ConfigService)
  const NODE_ENV = configService.get('NODE_ENV')

  app.useGlobalPipes(new ValidationPipe())

  app.setGlobalPrefix('api')

  app.enableCors({
    origin: configService.get('CORS_ORIGIN'),
    credentials: true,
  })

  const { httpAdapter } = app.get(HttpAdapterHost)

  app.useGlobalFilters(
    new PrismaClientExceptionFilter(httpAdapter, {
      // Prisma Error Code: HTTP Status Response
      P2000: HttpStatus.BAD_REQUEST,
      P2002: HttpStatus.CONFLICT,
      P2025: HttpStatus.NOT_FOUND,
    }),
  )

  const PORT = configService.get('PORT')

  await app.listen(PORT, () => {
    Logger.log(`Server running in ${NODE_ENV} mode on port ${PORT}`)
  })
}

bootstrap()

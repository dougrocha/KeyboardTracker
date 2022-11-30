import { Injectable, Logger } from '@nestjs/common'
import {
  loggingMiddleware,
  PrismaOptionsFactory,
  PrismaServiceOptions,
  QueryInfo,
} from 'nestjs-prisma'

@Injectable()
export class PrismaConfigService implements PrismaOptionsFactory {
  createPrismaOptions(): PrismaServiceOptions | Promise<PrismaServiceOptions> {
    return {
      prismaOptions: {
        log: ['query', 'info', 'warn'],
        errorFormat: 'pretty',
      },
      explicitConnect: true,
      middlewares: [
        loggingMiddleware({
          logger: new Logger('PrismaMiddleware'),
          logMessage: (query: QueryInfo) =>
            `[Prisma Query] ${query.model}.${query.action} - ${query.executionTime}ms`,
          logLevel: 'log',
        }),
      ],
    }
  }
}

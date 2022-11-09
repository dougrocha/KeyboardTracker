import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

import { DesignersController } from './designers.controller'
import { DesignersService } from './designers.service'

import { DESIGNERS_SERVICE, PRISMA_SERVICE } from '../common/constants'

@Module({
  controllers: [DesignersController],
  providers: [
    {
      provide: DESIGNERS_SERVICE,
      useClass: DesignersService,
    },
    {
      provide: PRISMA_SERVICE,
      useClass: PrismaService,
    },
  ],
})
export class DesignersModule {}

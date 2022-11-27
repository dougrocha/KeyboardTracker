import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

import { DesignersController } from './designer.controller'
import { DesignerService } from './designer.service'

import { DESIGNER_SERVICE, PRISMA_SERVICE } from '../common/constants'

@Module({
  controllers: [DesignersController],
  providers: [
    {
      provide: DESIGNER_SERVICE,
      useClass: DesignerService,
    },
    {
      provide: PRISMA_SERVICE,
      useClass: PrismaService,
    },
  ],
})
export class DesignerModule {}

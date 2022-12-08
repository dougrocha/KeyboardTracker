import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

import { DesignersController } from './designer.controller.js'
import { DesignerService } from './designer.service.js'

import {
  DESIGNER_SERVICE,
  PRISMA_SERVICE,
  PRODUCT_SERVICE,
} from '../common/constants.js'
import { ProductService } from '../product/services/product.service.js'

@Module({
  imports: [],
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
    {
      provide: PRODUCT_SERVICE,
      useClass: ProductService,
    },
  ],
})
export class DesignerModule {}

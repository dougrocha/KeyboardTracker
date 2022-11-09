import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

import { FormsController } from './controllers/forms.controller'
import { ProductsController } from './controllers/products.controller'
import { FormsService } from './services/forms.service'
import { ProductsService } from './services/products.service'

import {
  PRODUCTS_SERVICE,
  PRISMA_SERVICE,
  FORMS_SERVICE,
} from '../common/constants'

@Module({
  providers: [
    { provide: PRISMA_SERVICE, useClass: PrismaService },
    { provide: PRODUCTS_SERVICE, useClass: ProductsService },
    { provide: FORMS_SERVICE, useClass: FormsService },
  ],
  controllers: [ProductsController, FormsController],
  exports: [PRODUCTS_SERVICE],
})
export class ProductsModule {}

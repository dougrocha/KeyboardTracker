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
  DESIGNERS_SERVICE,
  VENDORS_SERVICE,
} from '../common/constants'
import { DesignersService } from '../designers/designers.service'
import { VendorsService } from '../vendors/vendors.service'

@Module({
  providers: [
    { provide: PRISMA_SERVICE, useClass: PrismaService },
    { provide: PRODUCTS_SERVICE, useClass: ProductsService },
    { provide: FORMS_SERVICE, useClass: FormsService },
    { provide: DESIGNERS_SERVICE, useClass: DesignersService },
    { provide: VENDORS_SERVICE, useClass: VendorsService },
  ],
  controllers: [ProductsController, FormsController],
  exports: [PRODUCTS_SERVICE],
})
export class ProductsModule {}

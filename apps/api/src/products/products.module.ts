import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import {
  PRODUCTS_SERVICE,
  KEYCAPS_SERVICE,
  PRISMA_SERVICE,
  FORMS_SERVICE,
} from '../common/constants'
import { KeycapsService } from '../keycaps/keycaps.service'
import { ProductsController } from './controllers/products.controller'
import { ProductsService } from './services/products.service'
import { FormsService } from './services/forms.service'
import { FormsController } from './controllers/forms.controller'

@Module({
  providers: [
    { provide: KEYCAPS_SERVICE, useClass: KeycapsService },
    { provide: PRISMA_SERVICE, useClass: PrismaService },
    { provide: PRODUCTS_SERVICE, useClass: ProductsService },
    { provide: FORMS_SERVICE, useClass: FormsService },
  ],
  controllers: [ProductsController, FormsController],
  exports: [PRODUCTS_SERVICE],
})
export class ProductsModule {}

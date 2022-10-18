import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import {
  PRODUCTS_SERVICE,
  KEYCAPS_SERVICE,
  PRISMA_SERVICE,
} from '../common/constants'
import { KeycapsService } from '../keycaps/keycaps.service'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

@Module({
  providers: [
    { provide: KEYCAPS_SERVICE, useClass: KeycapsService },
    { provide: PRISMA_SERVICE, useClass: PrismaService },
    { provide: PRODUCTS_SERVICE, useClass: ProductsService },
  ],
  controllers: [ProductsController],
  exports: [PRODUCTS_SERVICE],
})
export class ProductsModule {}

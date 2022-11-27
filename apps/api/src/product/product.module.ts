import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

import { FormController } from './controllers/form.controller'
import { ProductController } from './controllers/product.controller'
import { FormService } from './services/form.service'
import { ProductService } from './services/product.service'

import {
  PRODUCT_SERVICE,
  PRISMA_SERVICE,
  FORM_SERVICE,
  DESIGNER_SERVICE,
  VENDOR_SERVICE,
} from '../common/constants'
import { DesignerService } from '../designer/designer.service'
import { VendorService } from '../vendor/vendor.service'

@Module({
  providers: [
    { provide: PRISMA_SERVICE, useClass: PrismaService },
    { provide: PRODUCT_SERVICE, useClass: ProductService },
    { provide: FORM_SERVICE, useClass: FormService },
    { provide: DESIGNER_SERVICE, useClass: DesignerService },
    { provide: VENDOR_SERVICE, useClass: VendorService },
  ],
  controllers: [ProductController, FormController],
  exports: [PRODUCT_SERVICE],
})
export class ProductModule {}

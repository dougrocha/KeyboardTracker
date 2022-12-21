import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

import { FormController } from './controllers/form.controller.js'
import { ProductController } from './controllers/product.controller.js'
import { FormService } from './services/form.service.js'
import { ProductService } from './services/product.service.js'

import {
  PRODUCT_SERVICE,
  PRISMA_SERVICE,
  FORM_SERVICE,
  DESIGNER_SERVICE,
  VENDOR_SERVICE,
} from '../common/constants.js'
import { DesignerService } from '../designer/designer.service.js'
import { ImageModule } from '../image/image.module.js'
import { VendorService } from '../vendor/vendor.service.js'

@Module({
  imports: [ImageModule.register({ path: ['products'] })],
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

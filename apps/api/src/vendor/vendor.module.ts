import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

import { VendorController } from './vendor.controller.js'
import { VendorService } from './vendor.service.js'

import { VENDOR_SERVICE, PRISMA_SERVICE } from '../common/constants.js'

@Module({
  controllers: [VendorController],
  providers: [
    { provide: VENDOR_SERVICE, useClass: VendorService },
    { provide: PRISMA_SERVICE, useClass: PrismaService },
  ],
})
export class VendorModule {}

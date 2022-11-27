import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

import { VendorController } from './vendor.controller'
import { VendorService } from './vendor.service'

import { PRISMA_SERVICE, VENDOR_SERVICE } from '../common/constants'

@Module({
  controllers: [VendorController],
  providers: [
    { provide: VENDOR_SERVICE, useClass: VendorService },
    { provide: PRISMA_SERVICE, useClass: PrismaService },
  ],
})
export class VendorModule {}

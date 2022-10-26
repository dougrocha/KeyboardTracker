import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { PRISMA_SERVICE, VENDORS_SERVICE } from '../common/constants'
import { VendorsController } from './vendors.controller'
import { VendorsService } from './vendors.service'

@Module({
  controllers: [VendorsController],
  providers: [
    { provide: VENDORS_SERVICE, useClass: VendorsService },
    { provide: PRISMA_SERVICE, useClass: PrismaService },
  ],
})
export class VendorsModule {}

import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

import { PRISMA_SERVICE } from '../common/constants'

@Injectable()
export class VendorsService {
  constructor(@Inject(PRISMA_SERVICE) private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.vendor.findMany()
  }

  async findOne(id: string) {
    return await this.prisma.vendor.findUnique({
      where: {
        id,
      },
    })
  }

  async findAllByCountry(country: string) {
    return await this.prisma.vendor.findMany({
      where: {
        country: {
          contains: country,
          mode: 'insensitive',
        },
      },
    })
  }

  async findAllProducts(id: string) {
    return await this.prisma.productVendor.findMany({
      where: {
        vendorId: id,
      },
      include: {
        product: true,
      },
    })
  }
}

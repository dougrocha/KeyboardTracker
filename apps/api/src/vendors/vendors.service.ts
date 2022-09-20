import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { PRISMA_SERVICE } from '../common/constants'

@Injectable()
export class VendorsService {
  constructor(@Inject(PRISMA_SERVICE) private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.vendor.findMany()
  }

  async getOne(id: number) {
    return await this.prisma.vendor.findUnique({
      where: {
        id,
      },
    })
  }

  async getAllByCountry(country: string) {
    return await this.prisma.vendor.findMany({
      where: {
        country: {
          contains: country,
          mode: 'insensitive',
        },
      },
    })
  }

  async getAllKeycaps(id: number) {
    return await this.prisma.keycapSetVendor.findMany({
      where: {
        id: {
          equals: id,
        },
      },
    })
  }
}

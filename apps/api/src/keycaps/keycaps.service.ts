import { Injectable } from '@nestjs/common'
import { Inject } from '@nestjs/common/decorators'
import { PrismaService } from 'nestjs-prisma'
import { PRISMA_SERVICE } from '../common/constants'

@Injectable()
export class KeycapsService {
  constructor(@Inject(PRISMA_SERVICE) private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.keycapSet.findMany()
  }

  async getOne(id: number) {
    return await this.prisma.keycapSet.findUnique({
      where: {
        id,
      },
    })
  }

  async getOneBySlug(slug: string) {
    return await this.prisma.keycapSet.findUnique({
      where: {
        slug,
      },
    })
  }

  async getAllByBrand(brand: string) {
    return await this.prisma.keycapSet.findMany({
      where: {
        brand: {
          contains: brand,
          mode: 'insensitive',
        },
      },
    })
  }

  async getAllByDesigner(designer: string) {
    return await this.prisma.keycapSet.findMany({
      where: {
        designerId: designer,
      },
    })
  }

  async getAllByMaterial(material: string) {
    return await this.prisma.keycapSet.findMany({
      where: {
        material: {
          contains: material,
          mode: 'insensitive',
        },
      },
    })
  }

  async getVendors(id: number) {
    return await this.prisma.keycapSetVendor.findMany({
      where: {
        id: {
          equals: id,
        },
      },
    })
  }
}

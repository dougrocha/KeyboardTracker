import { Injectable } from '@nestjs/common'
import { Inject } from '@nestjs/common/decorators'
import { KeycapSet, Prisma } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { PRISMA_SERVICE } from '../common/constants'
import { CreateKeycapsDto } from './dtos/create-keycaps.dto'
import { UpdateKeycapSetDto } from './dtos/update-keycaps.dto'

interface findAllOptions {
  select?: Prisma.KeycapSetSelect
  orderBy?: Prisma.KeycapSetOrderByWithRelationInput
  take?: number
  skip?: number
}

@Injectable()
export class KeycapsService {
  constructor(@Inject(PRISMA_SERVICE) private readonly prisma: PrismaService) {}

  async findMany({ select, orderBy, take, skip }: findAllOptions = {}): Promise<
    Partial<KeycapSet>[]
  > {
    return await this.prisma.keycapSet.findMany({
      select,
      orderBy,
      take,
      skip,
    })
  }

  async findOne(id: string) {
    return await this.prisma.keycapSet.findUnique({
      where: {
        id,
      },
    })
  }

  async findAllByBrand(brand: string) {
    return await this.prisma.keycapSet.findMany({
      where: {
        brand: {
          contains: brand,
          mode: 'insensitive',
        },
      },
    })
  }

  async findAllByDesigner(designer: string, take?: number, skip?: number) {
    return await this.prisma.keycapSet.findMany({
      where: {
        designerId: designer,
      },
      take,
      skip,
    })
  }

  async findAllByMaterial(material: string) {
    return await this.prisma.keycapSet.findMany({
      where: {
        material: {
          contains: material,
          mode: 'insensitive',
        },
      },
    })
  }

  async findVendors(id: number) {
    return await this.prisma.keycapSetVendor.findMany({
      where: {
        id: {
          equals: id,
        },
      },
    })
  }

  async create({ ...data }: CreateKeycapsDto, designerId?: string) {
    return await this.prisma.keycapSet.create({
      data: {
        ...data,
        designer: { connect: { id: designerId } },
      },
    })
  }

  async update(id: string, data: UpdateKeycapSetDto) {
    return await this.prisma.keycapSet.update({
      where: {
        id,
      },
      data,
    })
  }
}

import { Injectable } from '@nestjs/common'
import { Inject } from '@nestjs/common/decorators'
import { KeycapSet, Prisma } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import { PRISMA_SERVICE } from '../common/constants'
import { CreateKeycapsDto } from './dtos/create-keycaps.dto'
import { UpdateKeycapSetDto } from './dtos/update-keycaps.dto'

interface findAllOptions {
  select?: Prisma.KeycapSetSelect
  orderBy?: Prisma.KeycapSetOrderByWithRelationAndSearchRelevanceInput
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

  async create({ ...data }: CreateKeycapsDto, productId?: string) {
    return await this.prisma.keycapSet.create({
      data: {
        ...data,
        product: {
          connect: {
            id: productId,
          },
        },
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

import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

import { CreateVendorDto } from './dto/create-vendor.dto'
import { UpdateVendorDto } from './dto/update-vendor.dto'

import { PRISMA_SERVICE, SNOWFLAKE_SERVICE } from '../common/constants'
import { PaginationParams } from '../products/dtos/queries/pagination-params.dto'
import { SnowflakeService } from '../snowflake/snowflake.module'

@Injectable()
export class VendorsService {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService,
    @Inject(SNOWFLAKE_SERVICE) private readonly snowflake: SnowflakeService,
  ) {}

  async create(data: CreateVendorDto) {
    return await this.prisma.vendor.create({
      data: {
        id: this.snowflake.nextId(),
        ...data,
      },
    })
  }

  async findMany(pagination?: PaginationParams) {
    return this.prisma.vendor.findMany({
      skip: pagination?.skip,
      take: pagination?.take,
    })
  }

  async findById(id: string) {
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

  async update(id: string, data: UpdateVendorDto) {
    return await this.prisma.vendor.update({
      where: {
        id,
      },
      data,
    })
  }

  async delete(id: string) {
    return await this.prisma.vendor.delete({
      where: {
        id,
      },
    })
  }
}

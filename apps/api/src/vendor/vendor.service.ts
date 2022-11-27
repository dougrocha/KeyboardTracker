import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

import { CreateVendorDto } from './dto/create-vendor.dto'
import { UpdateVendorDto } from './dto/update-vendor.dto'

import { PRISMA_SERVICE, SNOWFLAKE_SERVICE } from '../common/constants'
import { PaginationParams } from '../product/dtos/queries/pagination-params.dto'
import { SnowflakeService } from '../snowflake/snowflake.module'

@Injectable()
export class VendorService {
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

  async findMany(
    vendorId: string,
    { page = 1, perPage = 10 }: PaginationParams,
  ) {
    return this.prisma
      .$transaction([
        this.prisma.productVendor.count({
          where: {
            vendorId,
          },
        }),
        this.prisma.productVendor.findMany({
          where: {
            vendorId,
          },
          skip: (page - 1) * perPage,
          take: perPage,
          include: {
            product: true,
          },
        }),
      ])
      .then(([count, products]) => ({
        count,
        products: products.map(({ product }) => product),
      }))
  }

  async findById(id: string) {
    return await this.prisma.vendor.findUnique({
      where: {
        id,
      },
    })
  }

  async findByUserId(userId: string) {
    return await this.prisma.userVendor
      .findMany({
        where: {
          userId,
        },
        include: {
          vendor: true,
        },
      })
      .then((userVendors) => userVendors.map(({ vendor }) => vendor))
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

  async findAllProducts() {
    return this.prisma.vendor.findMany()
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

  async findUserAndVendor(userId: string, vendorId: string) {
    return await this.prisma.userVendor.findUnique({
      where: {
        vendorId_userId: {
          userId,
          vendorId,
        },
      },
    })
  }
}

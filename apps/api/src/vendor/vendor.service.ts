import { Product, Vendor } from '@meka/database'
import { MaybePaginated, PaginatedResults, PaginationParams } from '@meka/types'
import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

import { CreateVendorDto } from './dto/create-vendor.dto'
import { UpdateVendorDto } from './dto/update-vendor.dto'

import { PRISMA_SERVICE, SNOWFLAKE_SERVICE } from '../common/constants'
import BaseService from '../common/interfaces/base-service.interface'
import { SnowflakeService } from '../snowflake/snowflake.module'

@Injectable()
export class VendorService implements BaseService<Vendor> {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService,
    @Inject(SNOWFLAKE_SERVICE) private readonly snowflake: SnowflakeService,
  ) {}

  findOne(id: string): Promise<Vendor> {
    return this.prisma.vendor.findUnique({
      where: {
        id,
      },
    })
  }

  async create(data: CreateVendorDto) {
    return await this.prisma.vendor.create({
      data: {
        id: this.snowflake.nextId(),
        ...data,
      },
    })
  }

  async findMany(): Promise<Vendor[]>
  async findMany(params?: PaginationParams): Promise<PaginatedResults<Vendor>>
  async findMany(params?: unknown): Promise<MaybePaginated<Vendor>> {
    if (!params) return this.prisma.vendor.findMany()

    const { page = 1, perPage = 10 } = params as PaginationParams

    return await this.prisma
      .$transaction([
        this.prisma.vendor.findMany({
          skip: (page - 1) * perPage,
          take: perPage,
        }),
        this.prisma.vendor.count(),
      ])
      .then(([vendors, count]) => ({
        data: vendors,
        count,
      }))
  }

  async findVendorProducts(
    vendorId: string,
    params?: PaginationParams,
  ): Promise<MaybePaginated<Product>> {
    if (!params) {
      return this.prisma.product.findMany({
        where: {
          id: vendorId,
        },
      })
    }

    const { page = 1, perPage = 10 } = params

    return this.prisma
      .$transaction([
        this.prisma.productVendor.findMany({
          where: {
            vendorId,
          },
          include: {
            product: true,
          },
          skip: (page - 1) * perPage,
          take: perPage,
        }),
        this.prisma.productVendor.count({
          where: {
            vendorId,
          },
        }),
      ])
      .then(([products, count]) => ({
        data: products.map((product) => product.product),
        count,
      }))
  }

  async findById(id: string) {
    return this.prisma.vendor.findUnique({
      where: {
        id,
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

  async findUserVendors(userId: string) {
    return this.prisma.userVendor.findMany({
      where: {
        userId,
      },
      select: {
        vendor: {
          select: {
            id: true,
            name: true,
            country: true,
            verified: true,
          },
        },
      },
    })
  }

  async findVendorsByCountry(country: string) {
    return this.prisma.vendor.findMany({
      where: {
        country: {
          contains: country,
          mode: 'insensitive',
        },
      },
    })
  }

  async findUserVendor(userId: string, vendorId: string) {
    return await this.prisma.userVendor.findUnique({
      where: {
        vendorId_userId: {
          userId,
          vendorId,
        },
      },
    })
  }

  async findUserVendorRole(userId: string, vendorId: string) {
    return await this.prisma.userVendor.findUnique({
      where: {
        vendorId_userId: {
          userId,
          vendorId,
        },
      },
      select: {
        role: true,
      },
    })
  }
}
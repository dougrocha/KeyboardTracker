import { ProductWithPrice, Vendor } from '@meka/database'
import { MaybePaginated, PaginatedResults, PaginationParams } from '@meka/types'
import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

import { AddVendorProductDto } from './dto/add-vendor-product.dto.js'
import { CreateVendorDto } from './dto/create-vendor.dto.js'
import { UpdateVendorDto } from './dto/update-vendor.dto.js'

import { PRISMA_SERVICE, SNOWFLAKE_SERVICE } from '../common/constants.js'
import BaseService from '../common/interfaces/base-service.interface.js'
import { SnowflakeService } from '../snowflake/snowflake.module.js'

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
    if (Object.keys(params ?? {}).length === 0) {
      return this.prisma.vendor.findMany()
    }

    const { page, perPage } = params as PaginationParams

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
  ): Promise<MaybePaginated<ProductWithPrice>> {
    if (Object.keys(params ?? {}).length === 0) {
      return this.prisma.productVendor
        .findMany({
          where: {
            vendorId,
          },
          select: {
            price: true,
            product: true,
          },
        })
        .then((products) =>
          products.map((product) => ({
            ...product.product,
            price: product.price,
          })),
        )
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
      .then(([vendorProducts, count]) => ({
        data: vendorProducts.map((product) => ({
          ...product.product,
          price: product.price,
        })),
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
    return this.prisma.userVendor
      .findMany({
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
      .then((vendors) => vendors.map((vendor) => vendor.vendor))
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

  /**
   * Create a new product for the vendor
   *
   * Creating a product will not create a new product here it will only allow the vendor to sell the product.
   */
  async addVendorProduct(
    vendorId: string,
    { vendorId: _vendorId, productId, ...data }: AddVendorProductDto,
  ) {
    return await this.prisma.productVendor.create({
      data: {
        vendor: {
          connect: {
            id: vendorId,
          },
        },
        product: {
          connect: {
            id: productId,
          },
        },
      },
    })
  }
}

import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { PRISMA_SERVICE } from '../common/constants'

@Injectable()
export class ProductsService {
  constructor(@Inject(PRISMA_SERVICE) private readonly prisma: PrismaService) {}

  async create(data) {
    return
  }

  async update(params) {
    return
  }

  async delete(params) {
    return
  }

  async findMany(params) {
    return
  }

  async findOne(params) {
    return
  }
}

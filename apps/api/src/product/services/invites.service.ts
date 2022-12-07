import { ProductInvite } from '@meka/database'
import { PaginationParams, PaginatedResults } from '@meka/types'
import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

import { PRISMA_SERVICE, SNOWFLAKE_SERVICE } from '../../common/constants'
import BaseService from '../../common/interfaces/base-service.interface'
import { SnowflakeService } from '../../snowflake/snowflake.module'

@Injectable()
export class ProductInviteService implements BaseService<ProductInvite> {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService,
    @Inject(SNOWFLAKE_SERVICE) private readonly snowflake: SnowflakeService,
  ) {}

  create(data: ProductInvite): Promise<ProductInvite> {
    throw new Error('Method not implemented.')
  }

  findMany(
    params?: PaginationParams,
  ): Promise<PaginatedResults<ProductInvite>> {
    throw new Error('Method not implemented.')
  }

  findOne(id: string): Promise<ProductInvite> {
    throw new Error('Method not implemented.')
  }

  update(id: string, data: ProductInvite): Promise<ProductInvite> {
    throw new Error('Method not implemented.')
  }

  delete(id: string): Promise<ProductInvite> {
    throw new Error('Method not implemented.')
  }
}

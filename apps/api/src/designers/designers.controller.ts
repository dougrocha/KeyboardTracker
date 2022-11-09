import { Controller, Get, Inject, Patch, Post } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

import { PRISMA_SERVICE } from '../common/constants'

@Controller('designers')
export class DesignersController {
  constructor(@Inject(PRISMA_SERVICE) private readonly prisma: PrismaClient) {}

  @Post()
  async createAccount() {
    return
  }

  @Get()
  async getAccount() {
    return
  }

  @Patch()
  async updateAccount() {
    return
  }
}

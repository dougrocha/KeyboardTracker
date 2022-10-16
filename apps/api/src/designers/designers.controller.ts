import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { KEYCAPS_SERVICE, PRISMA_SERVICE } from '../common/constants'
import { CreateKeycapsDto } from '../keycaps/dtos/create-keycaps.dto'
import { KeycapsService } from '../keycaps/keycaps.service'

@Controller('designers')
export class DesignersController {
  constructor(
    @Inject(KEYCAPS_SERVICE) private readonly keycapsService: KeycapsService,
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaClient,
  ) {}

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

  @Get(':id/keyboards')
  async getAccountKeyboards(
    @Param('id') id: string,
    @Query('take') take: number,
    @Query('skip') skip: number,
  ) {
    return await this.keycapsService.findAllByDesigner(id, take, skip)
  }

  @Post(':id/keyboards')
  @HttpCode(HttpStatus.CREATED)
  async createKeyboard(
    @Param('id') id: string,
    @Body('keycapSet') body: CreateKeycapsDto,
  ) {
    return await this.keycapsService.create(body, id)
  }

  @Patch(':id/keyboards')
  async updateKeyboard() {
    return
  }

  @Delete(':id/keyboards')
  async deleteKeyboard() {
    return
  }
}

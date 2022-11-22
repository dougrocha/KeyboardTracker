import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { User } from '@prisma/client'

import { DesignersService } from './designers.service'
import { CreateDesignerDto } from './dtos/create-designer'
import { UpdateDesignerDto } from './dtos/update-designer.dto'

import { DESIGNERS_SERVICE } from '../common/constants'
import { GetCurrentUser } from '../common/decorators/current-user.decorator'
import { AuthenticatedGuard } from '../common/guards/authenticated.guard'

@Controller('designers')
export class DesignersController {
  constructor(
    @Inject(DESIGNERS_SERVICE)
    private readonly designersService: DesignersService,
  ) {}

  @Post()
  @UseGuards(AuthenticatedGuard)
  async createAccount(
    @GetCurrentUser() user: User,
    @Body() createDesignerBody: CreateDesignerDto,
  ) {
    return await this.designersService.create(user.id, createDesignerBody)
  }

  @Get(':id')
  async getAccount(@Param('id') id: string) {
    return await this.designersService.findById(id)
  }

  @Patch(':id')
  @UseGuards(AuthenticatedGuard)
  async updateAccount(
    @Param('id') id: string,
    @Body() updateDesignerBody: UpdateDesignerDto,
  ) {
    return await this.designersService.update(id, updateDesignerBody)
  }

  @Delete(':id')
  async deleteAccount(@Param('id') id: string) {
    return await this.designersService.delete(id)
  }

  @Get(':id/products')
  async getProducts(
    @Param('id') id: string,
    @Query('page', ParseIntPipe) page?: number,
  ) {
    return await this.designersService.getProducts(id, page)
  }
}

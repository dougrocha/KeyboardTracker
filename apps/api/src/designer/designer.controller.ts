import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { User } from '@prisma/client'

import { DesignerService } from './designer.service'
import { CreateDesignerDto } from './dtos/create-designer'
import { UpdateDesignerDto } from './dtos/update-designer.dto'

import { DESIGNER_SERVICE } from '../common/constants'
import { GetCurrentUser } from '../common/decorators/current-user.decorator'
import { AuthenticatedGuard } from '../common/guards/authenticated.guard'
import { PaginationParams } from '../product/dtos/queries/pagination-params.dto'

@Controller('designer')
export class DesignersController {
  constructor(
    @Inject(DESIGNER_SERVICE)
    private readonly designerService: DesignerService,
  ) {}

  @Post()
  @UseGuards(AuthenticatedGuard)
  async createAccount(
    @GetCurrentUser() user: User,
    @Body() createDesignerBody: CreateDesignerDto,
  ) {
    return await this.designerService.create(user.id, createDesignerBody)
  }

  @Get(':id')
  async getAccount(@Param('id') id: string) {
    return await this.designerService.findById(id)
  }

  @Patch(':id')
  @UseGuards(AuthenticatedGuard)
  async updateAccount(
    @Param('id') id: string,
    @Body() updateDesignerBody: UpdateDesignerDto,
  ) {
    return await this.designerService.update(id, updateDesignerBody)
  }

  @Delete(':id')
  async deleteAccount(@Param('id') id: string) {
    return await this.designerService.delete(id)
  }

  @Get(':id/products')
  async getProducts(
    @Param('id') id: string,
    @Query() pagination: PaginationParams,
  ) {
    return await this.designerService.getProducts(id, pagination)
  }
}

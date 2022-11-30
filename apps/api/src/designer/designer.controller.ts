import { User } from '@meka/database'
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

import { DesignerService } from './designer.service'
import { CreateDesignerDto } from './dtos/create-designer'
import { UpdateDesignerDto } from './dtos/update-designer.dto'

import { DESIGNER_SERVICE } from '../common/constants'
import { GetCurrentUser } from '../common/decorators/current-user.decorator'
import { PaginationParams } from '../common/dto/pagination-params.dto'
import { AuthenticatedGuard } from '../common/guards/authenticated.guard'
import { DesignerOwner } from '../common/guards/designer-owner.guard'

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
    return await this.designerService.create({
      userId: user.id,
      ...createDesignerBody,
    })
  }

  @Get(':id')
  async getAccount(@Param('id') id: string) {
    return await this.designerService.findOne(id)
  }

  @Patch(':id')
  @UseGuards(AuthenticatedGuard, DesignerOwner)
  async updateAccount(
    @Param('id') id: string,
    @Body() updateDesignerBody: UpdateDesignerDto,
  ) {
    return await this.designerService.update(id, updateDesignerBody)
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard, DesignerOwner)
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

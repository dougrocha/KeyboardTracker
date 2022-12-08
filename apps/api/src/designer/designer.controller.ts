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

import { DesignerService } from './designer.service.js'
import { CreateDesignerDto } from './dtos/create-designer.js'
import { UpdateDesignerDto } from './dtos/update-designer.dto.js'

import { DESIGNER_SERVICE } from '../common/constants.js'
import { GetCurrentUser } from '../common/decorators/current-user.decorator.js'
import { PaginationParams } from '../common/dto/pagination-params.dto.js'
import { AuthenticatedGuard } from '../common/guards/authenticated.guard.js'
import { DesignerOwner } from '../common/guards/designer-owner.guard.js'
import { CreateProductDto } from '../product/dtos/create-product.dto.js'
import { UpdateProductDto } from '../product/dtos/update-product.dto.js'

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

  @Post(':id/products')
  @UseGuards(AuthenticatedGuard, DesignerOwner)
  async createProduct(
    @Param('id') id: string,
    @Body() createProductBody: CreateProductDto,
  ) {
    return await this.designerService.createProduct(id, createProductBody)
  }

  @Patch(':id/products/:productId')
  @UseGuards(AuthenticatedGuard, DesignerOwner)
  async updateProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
    @Body() updateProductBody: UpdateProductDto,
  ) {
    return await this.designerService.updateProduct(id, {
      id: productId,
      ...updateProductBody,
    })
  }
}

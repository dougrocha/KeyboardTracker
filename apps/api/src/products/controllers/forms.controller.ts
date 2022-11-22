import { Controller } from '@nestjs/common'
import {
  Body,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common/decorators'
import { User } from '@prisma/client'

import { FORMS_SERVICE } from '../../common/constants'
import { GetCurrentUser } from '../../common/decorators/current-user.decorator'
import { Roles } from '../../common/decorators/roles.decorator'
import { CanEditDesigner } from '../../common/guards/designer-owner.guard'
import { CreateFormDto } from '../dtos/create-form.dto'
import { FormsService } from '../services/forms.service'

@Controller()
export class FormsController {
  constructor(@Inject(FORMS_SERVICE) private readonly forms: FormsService) {}

  @Get(':id/form')
  @UseGuards(CanEditDesigner)
  @Roles('DESIGNER', 'USER')
  async getForm(@Param('id') id: string) {
    return await this.forms.findOneByProductId(id)
  }

  @Post(':id/form')
  async createForm(
    @Param('id') productId: string,
    @GetCurrentUser() user: User,
    @Body() form: CreateFormDto,
  ) {
    return await this.forms.create({ productId, createdById: user, ...form })
  }
}

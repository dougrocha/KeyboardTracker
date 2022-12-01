import { User } from '@meka/database'
import { Controller } from '@nestjs/common'
import { Body, Get, Inject, Param, Post } from '@nestjs/common/decorators'

import { FORM_SERVICE } from '../../common/constants.js'
import { GetCurrentUser } from '../../common/decorators/current-user.decorator.js'
import { CreateFormDto } from '../dtos/create-form.dto.js'
import { FormService } from '../services/form.service.js'

@Controller()
export class FormController {
  constructor(@Inject(FORM_SERVICE) private readonly form: FormService) {}

  @Get(':id/form')
  async getForm(@Param('id') id: string) {
    return await this.form.findProductFormWithFieldsAndValues(id)
  }

  @Post(':id/form')
  async createForm(
    @Param('id') productId: string,
    @GetCurrentUser() user: User,
    @Body() form: CreateFormDto,
  ) {
    return await this.form.create({ productId, createdById: user, ...form })
  }
}

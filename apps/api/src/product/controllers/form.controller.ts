import { Controller } from '@nestjs/common'
import { Body, Get, Inject, Param, Post } from '@nestjs/common/decorators'
import { User } from '@meka/database'

import { FORM_SERVICE } from '../../common/constants'
import { GetCurrentUser } from '../../common/decorators/current-user.decorator'
import { CreateFormDto } from '../dtos/create-form.dto'
import { FormService } from '../services/form.service'

@Controller()
export class FormController {
  constructor(@Inject(FORM_SERVICE) private readonly form: FormService) {}

  @Get(':id/form')
  async getForm(@Param('id') id: string) {
    return await this.form.findProductForm(id)
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

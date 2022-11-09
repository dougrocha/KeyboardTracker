import { Controller } from '@nestjs/common'
import { Get, Inject, Param } from '@nestjs/common/decorators'

import { FORMS_SERVICE } from '../../common/constants'
import { FormsService } from '../services/forms.service'

@Controller()
export class FormsController {
  constructor(@Inject(FORMS_SERVICE) private readonly forms: FormsService) {}

  @Get(':id/form')
  async getForm(@Param('id') id: string) {
    return await this.forms.findOneByProductId(id)
  }
}

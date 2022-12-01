import { PartialType, OmitType } from '@nestjs/mapped-types'

import { CreateDesignerDto } from './create-designer.js'

export class UpdateDesignerDto extends OmitType(
  PartialType(CreateDesignerDto),
  ['userId'],
) {}

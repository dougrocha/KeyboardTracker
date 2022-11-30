import { PartialType, OmitType } from '@nestjs/mapped-types'

import { CreateDesignerDto } from './create-designer'

export class UpdateDesignerDto extends OmitType(
  PartialType(CreateDesignerDto),
  ['userId'],
) {}

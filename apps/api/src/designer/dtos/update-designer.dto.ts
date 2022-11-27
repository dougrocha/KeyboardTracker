import { PartialType } from '@nestjs/mapped-types'

import { CreateDesignerDto } from './create-designer'

export class UpdateDesignerDto extends PartialType(CreateDesignerDto) {}

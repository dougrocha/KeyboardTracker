import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsString } from 'class-validator'
import { CreateFormFieldDto } from './create-form-field.dto'

export class UpdateFormFieldDto extends PartialType(CreateFormFieldDto) {
  @IsNotEmpty()
  @IsString()
  id: string
}

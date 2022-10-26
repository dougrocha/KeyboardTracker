import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsString } from 'class-validator'
import { CreateFormDto } from './create-form.dto'

export class UpdateFormDto extends PartialType(CreateFormDto) {
  @IsNotEmpty()
  @IsString()
  id: string
}

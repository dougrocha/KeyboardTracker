import { FieldType } from '@prisma/client'
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateFormFieldDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  required?: boolean

  @IsNotEmpty()
  @IsInt()
  position: number

  @IsNotEmpty()
  @IsEnum(FieldType)
  type: FieldType
}

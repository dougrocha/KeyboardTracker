import { IsNotEmpty, IsInt, IsString } from 'class-validator'

export class CreateFormFieldValueDto {
  @IsNotEmpty()
  @IsInt()
  position: number

  @IsNotEmpty()
  @IsString()
  value: string
}

import { PartialType } from '@nestjs/mapped-types'
import { CreateKeycapsDto } from './create-keycaps.dto'

export class UpdateKeycapSetDto extends PartialType(CreateKeycapsDto) {}

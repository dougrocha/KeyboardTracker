import { PartialType } from '@nestjs/mapped-types'
import { CreateDiscordUserDto } from './create-discord-user.dto'

export class UpdateDiscordUserDto extends PartialType(CreateDiscordUserDto) {}

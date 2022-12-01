import { PartialType } from '@nestjs/mapped-types'

import { CreateDiscordUserDto } from './create-discord-user.dto.js'

export class UpdateDiscordUserDto extends PartialType(CreateDiscordUserDto) {}

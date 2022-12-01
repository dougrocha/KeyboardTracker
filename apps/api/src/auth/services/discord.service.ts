import { Inject, Injectable } from '@nestjs/common'

import { DISCORD_USER_SERVICE } from '../../common/constants.js'
import BaseAuthService from '../../common/interfaces/base-auth-service.interface.js'
import { CreateDiscordUserDto } from '../../user/dto/create-discord-user.dto.js'
import { DiscordUserService } from '../../user/services/discord.service.js'

@Injectable()
export class DiscordAuthService
  implements BaseAuthService<CreateDiscordUserDto>
{
  constructor(
    @Inject(DISCORD_USER_SERVICE)
    private readonly discordUserService: DiscordUserService,
  ) {}

  async validate(details: CreateDiscordUserDto) {
    const discordUser = await this.discordUserService.findUserByDiscordId(
      details.discordId,
    )

    if (discordUser) {
      return await this.discordUserService.update(discordUser.id, details)
    } else {
      return await this.discordUserService.create(details)
    }
  }
}

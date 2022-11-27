import { Inject, Injectable } from '@nestjs/common'

import { DISCORD_USER_SERVICE } from '../../common/constants'
import { CreateDiscordUserDto } from '../../user/dto/create-discord-user.dto'
import { DiscordUserService } from '../../user/services/discord.service'

@Injectable()
export class DiscordAuthService {
  constructor(
    @Inject(DISCORD_USER_SERVICE)
    private readonly discordUserService: DiscordUserService,
  ) {}

  async validateUser(details: CreateDiscordUserDto) {
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

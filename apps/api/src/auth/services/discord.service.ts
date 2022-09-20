import { Inject, Injectable } from '@nestjs/common'
import { DISCORD_USERS_SERVICE } from '../../common/constants'

import { DiscordUsersService } from '../../users/services/discord.service'
import { CreateDiscordUserDto } from '../../users/dto/create-discord-user.dto'

@Injectable()
export class DiscordAuthService {
  constructor(
    @Inject(DISCORD_USERS_SERVICE)
    private readonly discordUsersService: DiscordUsersService,
  ) {}

  async validateUser(details: CreateDiscordUserDto) {
    const discordUser = await this.discordUsersService.findUserByDiscordId(
      details.discordId,
    )

    if (discordUser) {
      return await this.discordUsersService.update(discordUser.id, details)
    } else {
      return await this.discordUsersService.create(details)
    }
  }
}

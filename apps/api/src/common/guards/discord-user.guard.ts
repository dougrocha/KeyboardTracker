import { CanActivate, ExecutionContext } from '@nestjs/common'
import { Inject } from '@nestjs/common/decorators/core/inject.decorator.js'

import { DiscordUserService } from '../../user/services/discord.service.js'
import { DISCORD_USER_SERVICE } from '../constants.js'

export class FillDiscordUser implements CanActivate {
  constructor(
    @Inject(DISCORD_USER_SERVICE)
    private readonly discordUserService: DiscordUserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const user = request.user

    const discordUser = await this.discordUserService.findOne(user.id)

    if (user) {
      request.user = {
        ...user,
        discordUser,
      }
    }

    return true
  }
}

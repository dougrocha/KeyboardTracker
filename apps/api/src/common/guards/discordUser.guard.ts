import { CanActivate, ExecutionContext } from '@nestjs/common'
import { Inject } from '@nestjs/common/decorators/core/inject.decorator'
import { DiscordUsersService } from '../../users/services/discord.service'
import { DISCORD_USERS_SERVICE } from '../constants'

export class FillDiscordUser implements CanActivate {
  constructor(
    @Inject(DISCORD_USERS_SERVICE)
    private readonly discordUsersService: DiscordUsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const user = request.user

    const discordUser = await this.discordUsersService.findUser(user.id)

    if (user) {
      request.user = {
        ...user,
        discordUser,
      }
    }

    return true
  }
}

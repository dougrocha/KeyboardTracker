import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-discord'
import { DISCORD_AUTH_SERVICE } from '../../common/constants'
import { DiscordAuthService } from '../services/discord.service'

const DISCORD_SCOPES = ['email', 'identify']

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(DISCORD_AUTH_SERVICE)
    private readonly authService: DiscordAuthService,
    configService: ConfigService,
  ) {
    super({
      clientID: configService.get('DISCORD_CLIENT_ID'),
      clientSecret: configService.get('DISCORD_CLIENT_SECRET'),
      callbackURL: configService.get('DISCORD_CALLBACK_URL'),
      scope: DISCORD_SCOPES,
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { discriminator, username, email } = profile

    return this.authService.validateUser({
      discordId: profile.id,
      username,
      discriminator,
      email,
      refreshToken,
      accessToken,
    })
  }
}

import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-discord'

import { DISCORD_AUTH_SERVICE } from '../../common/constants.js'
import { DiscordAuthService } from '../services/discord.service.js'

const DISCORD_SCOPES = ['email', 'identify']

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(DISCORD_AUTH_SERVICE)
    private readonly discordAuthService: DiscordAuthService,
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
    const { discriminator, username, email, mfa_enabled } = profile

    return this.discordAuthService.validate({
      discordId: profile.id,
      username,
      discriminator,
      email,
      refreshToken,
      accessToken,
      mfaEnabled: mfa_enabled,
    })
  }
}

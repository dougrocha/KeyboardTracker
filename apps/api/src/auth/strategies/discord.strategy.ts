import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-discord'
import { AUTH_SERVICE } from '../../common/constants'
import { AuthService } from '../auth.service'

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get('DISCORD_CLIENT_ID'),
      clientSecret: configService.get('DISCORD_CLIENT_SECRET'),
      callbackURL: configService.get('DISCORD_CALLBACK_URL'),
      scope: ['email', 'identify'],
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { discriminator, id, username, email } = profile

    const details = {
      discordId: id,
      username,
      discriminator,
      email,
      refreshToken,
      accessToken,
    }

    return this.authService.validateDiscordUser(details)
  }
}

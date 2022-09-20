import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { LOCAL_AUTH_SERVICE } from '../../common/constants'
import { LocalAuthService } from '../services/local.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(LOCAL_AUTH_SERVICE) private readonly authService: LocalAuthService,
  ) {
    super({
      usernameField: 'email',
    })
  }

  async validate(email: string, password: string) {
    return await this.authService.validate(email, password)
  }
}

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AUTH_SERVICE } from '../../common/constants'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(AUTH_SERVICE) private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    })
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateLocalUser(email, password)
    if (!user) throw new UnauthorizedException()
    return user
  }
}

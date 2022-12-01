import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { compare, hash } from 'bcrypt'

import { USER_SERVICE } from '../../common/constants.js'
import BaseAuthService from '../../common/interfaces/base-auth-service.interface.js'
import { CreateUserDto } from '../../user/dto/create-user.dto.js'
import { UserService } from '../../user/services/user.service.js'

@Injectable()
export class LocalAuthService implements BaseAuthService<CreateUserDto> {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserService,
  ) {}

  async validate(details: Required<Pick<CreateUserDto, 'email' | 'password'>>) {
    const user = await this.userService.findUserByEmail(details.email)
    if (!user) throw new UnauthorizedException('Incorrect email or password')
    await this.comparePasswords(user.password, details.password)
    user.password = undefined
    return user
  }

  private async hashData(data: string) {
    return await hash(data, 10)
  }

  private async comparePasswords(password: string, hashedPassword: string) {
    const isValid = await compare(hashedPassword, password)
    if (!isValid) throw new UnauthorizedException('Incorrect email or password')
    return isValid
  }

  async register(user: CreateUserDto, password: string) {
    const hashedPassword = await this.hashData(password)
    return await this.userService.create({ ...user, password: hashedPassword })
  }

  async login(email: string, password: string) {
    return await this.validate({ email, password })
  }
}

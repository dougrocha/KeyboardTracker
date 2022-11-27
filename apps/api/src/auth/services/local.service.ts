import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { compare, hash } from 'bcrypt'

import { USER_SERVICE } from '../../common/constants'
import { CreateUserDto } from '../../user/dto/create-user.dto'
import { UserService } from '../../user/services/user.service'

@Injectable()
export class LocalAuthService {
  constructor(
    @Inject(USER_SERVICE) private readonly UserService: UserService,
  ) {}

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
    return await this.UserService.create({ ...user, password: hashedPassword })
  }

  async validate(email: string, password: string) {
    const user = await this.UserService.findByEmail(email)
    if (!user) throw new UnauthorizedException('Incorrect email or password')
    await this.comparePasswords(user.password, password)
    user.password = undefined
    return user
  }

  async login(email: string, password: string) {
    const user = await this.validate(email, password)
    return user
  }
}

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { compare, hash } from 'bcrypt'

import { USERS_SERVICE } from '../../common/constants'
import { CreateUserDto } from '../../users/dto/create-user.dto'
import { UsersService } from '../../users/services/users.service'


@Injectable()
export class LocalAuthService {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: UsersService,
  ) {}

  private async hashData(data: string) {
    return await hash(data, 10)
  }

  private async comparePasswords(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword)
  }

  async register(user: CreateUserDto, password: string) {
    const hashedPassword = await this.hashData(password)
    return await this.usersService.create({ ...user, password: hashedPassword })
  }

  async validate(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)

    if (!user) throw new UnauthorizedException('Incorrect email or password')

    const isPasswordValid = await this.comparePasswords(password, user.password)

    if (!isPasswordValid)
      throw new UnauthorizedException('Incorrect email or password')

    return { ...user, password: undefined }
  }
}

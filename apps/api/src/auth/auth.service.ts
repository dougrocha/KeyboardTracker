import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { DISCORD_USERS_SERVICE, USERS_SERVICE } from '../common/constants'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { UsersService } from '../users/services/users.service'

import * as bcrypt from 'bcrypt'
import { DiscordUsersService } from '../users/services/discord.service'
import { CreateDiscordUserDto } from '../users/dto/create-discord-user.dto'

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: UsersService,
    @Inject(DISCORD_USERS_SERVICE)
    private readonly discordUsersService: DiscordUsersService,
  ) {}

  async validateLocalUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!user || !isPasswordValid)
      throw new UnauthorizedException('Incorrect email or password')

    const { password: _password, ...validUser } = user
    return validUser
  }

  async validateDiscordUser(details: CreateDiscordUserDto) {
    const discordUser = await this.discordUsersService.findUserByDiscordId(
      details.discordId,
    )

    if (discordUser) {
      return await this.discordUsersService.update(discordUser.id, details)
    } else {
      const user = await this.usersService.createWithDiscord(
        {
          email: details.email,
          username: details.username,
        },
        details,
      )

      return user
    }
  }

  async registerLocalUser(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }
}

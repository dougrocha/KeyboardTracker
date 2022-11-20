import { Inject, Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { User } from '@prisma/client'

import { UsersService } from '../../users/services/users.service'
import { USERS_SERVICE } from '../constants'

type UserWithoutPassword = Omit<User, 'password'>

type Done = (err: Error | null, user: UserWithoutPassword | null) => void

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: UsersService,
  ) {
    super()
  }

  serializeUser(user: UserWithoutPassword, done: Done) {
    done(null, user)
  }

  async deserializeUser(user: User, done: Done) {
    const validUser = await this.usersService.findById(user.id)

    return user ? done(null, validUser) : done(null, null)
  }
}

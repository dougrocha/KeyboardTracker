import { Inject, Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { User } from '@prisma/client'

import { UserService } from '../../user/services/user.service'
import { USER_SERVICE } from '../constants'

type UserWithoutPassword = Omit<User, 'password'>

type Done = (err: Error | null, user: UserWithoutPassword | null) => void

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(@Inject(USER_SERVICE) private readonly UserService: UserService) {
    super()
  }

  serializeUser(user: UserWithoutPassword, done: Done) {
    done(null, user)
  }

  async deserializeUser(user: User, done: Done) {
    const validUser = await this.UserService.findById(user.id)

    return user ? done(null, validUser) : done(null, null)
  }
}

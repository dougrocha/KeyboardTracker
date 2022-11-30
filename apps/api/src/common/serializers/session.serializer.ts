import { Inject, Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { User } from '@meka/database'

import { UserService } from '../../user/services/user.service'
import { USER_SERVICE } from '../constants'

type UserWithoutPassword = Omit<User, 'password'>

type Done = (err: Error | null, user: UserWithoutPassword | null) => void

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(@Inject(USER_SERVICE) private readonly userService: UserService) {
    super()
  }

  serializeUser(user: UserWithoutPassword, done: Done) {
    done(null, user)
  }

  async deserializeUser(user: User, done: Done) {
    const validUser = await this.userService.findOne(user.id)

    return user ? done(null, validUser) : done(null, null)
  }
}

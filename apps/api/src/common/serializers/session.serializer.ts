import { Inject, Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'
import { User } from '@prisma/client'
import { UsersService } from '../../users/services/users.service'
import { USERS_SERVICE } from '../constants'

type Done = (err: Error | null, user: User | null) => void

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: UsersService,
  ) {
    super()
  }

  serializeUser(user: User, done: Done) {
    done(null, user)
  }

  async deserializeUser(user: any, done: Done) {
    const idToSearch = user.userId ? user.userId : user.id
    const validUser = await this.usersService.findById(idToSearch)
    return user ? done(null, validUser) : done(null, null)
  }
}

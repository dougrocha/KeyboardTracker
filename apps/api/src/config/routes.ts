import { Routes } from '@nestjs/core'
import { AuthModule } from '../auth/auth.module'
import { UsersModule } from '../users/users.module'

export const routes: Routes = [
  {
    path: '/auth',
    module: AuthModule,
  },
  {
    path: '/users',
    module: UsersModule,
  },
]

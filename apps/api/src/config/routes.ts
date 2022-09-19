import { Routes } from '@nestjs/core'
import { AuthModule } from '../auth/auth.module'

export const routes: Routes = [
  {
    path: '/auth',
    module: AuthModule,
  },
]

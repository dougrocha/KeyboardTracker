import { Routes } from '@nestjs/core'

import { AuthModule } from '../auth/auth.module'
import { ProductModule } from '../product/product.module'
import { UserModule } from '../user/user.module'

export const routes: Routes = [
  {
    path: '/auth',
    module: AuthModule,
  },
  {
    path: '/user',
    module: UserModule,
  },
  {
    path: '/product',
    module: ProductModule,
  },
]

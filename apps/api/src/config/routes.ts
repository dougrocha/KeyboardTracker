import { Routes } from '@nestjs/core'

import { AuthModule } from '../auth/auth.module.js'
import { ProductModule } from '../product/product.module.js'
import { UserModule } from '../user/user.module.js'

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

import { Routes } from '@nestjs/core'
import { AuthModule } from '../auth/auth.module'
import { ProductsModule } from '../products/products.module'
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
  {
    path: '/products',
    module: ProductsModule,
  },
]

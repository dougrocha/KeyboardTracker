import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common'
import { User } from '@prisma/client'
import { RoleType } from '../enums/roles.enum'

const RoleGuard = (role: RoleType): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest()
      const user = request.user as User

      // return user?.role.includes(role)
      return true
    }
  }

  return mixin(RoleGuardMixin)
}

export default RoleGuard

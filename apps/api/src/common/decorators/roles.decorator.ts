import { SetMetadata } from '@nestjs/common'
import { VendorRole } from '@meka/database'

export const Roles = <T extends string>(...roles: T[]) =>
  SetMetadata('roles', roles)

export const VendorRoles = Roles<VendorRole>

import { VendorRole } from '@meka/database'
import { SetMetadata } from '@nestjs/common'

export const Roles = <T extends string>(...roles: T[]) =>
  SetMetadata('roles', roles)

export const VendorRoles = Roles<VendorRole>

import { VendorRole } from '@meka/database'
import { CanActivate, ExecutionContext, Inject } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { VendorService } from '../../vendor/vendor.service'
import { VENDOR_SERVICE } from '../constants'

export class VendorOwner implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(VENDOR_SERVICE)
    private readonly vendorService: VendorService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const { id: vendorId } = request.params
    const { id: userId } = request.user

    const role = this.reflector.get<VendorRole[]>('role', context.getHandler())

    const vendor = await this.vendorService.findUserVendorRole(userId, vendorId)

    return role.includes(vendor.role)
  }
}

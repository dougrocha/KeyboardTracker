import { VendorRole } from '@meka/database'
import {
  CanActivate,
  ExecutionContext,
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'

import { VendorService } from '../../vendor/vendor.service.js'
import { VENDOR_SERVICE } from '../constants.js'

export class VendorOwner implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(VENDOR_SERVICE)
    private readonly vendorService: VendorService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request
    const { id: vendorId } = request.params

    const user = request.user as any

    if (!user) return false

    const userId = user.id

    const role = this.reflector.get<VendorRole[]>('roles', context.getHandler())

    const vendor = await this.vendorService.findUserVendorRole(userId, vendorId)

    if (!vendor) throw new NotFoundException('Vendor not found')

    if (vendor.role === VendorRole.USER)
      throw new UnauthorizedException(
        'Unauthorized. You are not allowed to access this resource.',
      )

    return true
  }
}

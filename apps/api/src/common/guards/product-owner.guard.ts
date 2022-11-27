import { CanActivate, ExecutionContext, Inject } from '@nestjs/common'

import { ProductService } from '../../product/services/product.service'
import { VendorService } from '../../vendor/vendor.service'
import { PRODUCT_SERVICE, VENDOR_SERVICE } from '../constants'

export class ProductOwner implements CanActivate {
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly productService: ProductService,
    @Inject(VENDOR_SERVICE)
    private readonly vendorService: VendorService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const user = request.user
    const productId = request.params.id

    const userVendor = await this.vendorService.findUserAndVendor(
      user.id,
      productId,
    )

    return !!userVendor
  }
}

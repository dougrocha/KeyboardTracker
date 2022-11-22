import { CanActivate, ExecutionContext, Inject } from '@nestjs/common'

import { ProductsService } from '../../products/services/products.service'
import { VendorsService } from '../../vendors/vendors.service'
import { PRODUCTS_SERVICE, VENDORS_SERVICE } from '../constants'

export class ProductOwner implements CanActivate {
  constructor(
    @Inject(PRODUCTS_SERVICE)
    private readonly productsService: ProductsService,
    @Inject(VENDORS_SERVICE)
    private readonly vendorsService: VendorsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const user = request.user
    const productId = request.params.id

    const userVendor = await this.vendorsService.findUserAndVendor(
      user.id,
      productId,
    )

    return !!userVendor
  }
}

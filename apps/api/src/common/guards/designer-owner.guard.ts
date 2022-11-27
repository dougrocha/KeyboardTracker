import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { DesignerService } from '../../designer/designer.service'
import { ProductService } from '../../product/services/product.service'
import { DESIGNER_SERVICE, PRODUCT_SERVICE } from '../constants'
import { RoleType } from '../enums/roles.enum'

@Injectable()
export class CanEditDesigner implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(PRODUCT_SERVICE)
    private readonly productService: ProductService,
    @Inject(DESIGNER_SERVICE)
    private readonly designerService: DesignerService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<RoleType[]>('roles', context.getHandler())

    const request = context.switchToHttp().getRequest()

    const user = request.user
    const productId = request.params.id

    const designer = await this.designerService.findByUserId(user.id)

    const productAndDesigner =
      await this.productService.findByProductAndDesignerId(
        productId,
        designer.id,
      )

    return !!productAndDesigner
  }
}

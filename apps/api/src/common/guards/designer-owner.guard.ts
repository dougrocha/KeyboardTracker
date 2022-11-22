import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { DesignersService } from '../../designers/designers.service'
import { ProductsService } from '../../products/services/products.service'
import { DESIGNERS_SERVICE, PRODUCTS_SERVICE } from '../constants'
import { RoleType } from '../enums/roles.enum'

@Injectable()
export class CanEditDesigner implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(PRODUCTS_SERVICE)
    private readonly productsService: ProductsService,
    @Inject(DESIGNERS_SERVICE)
    private readonly designersService: DesignersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<RoleType[]>('roles', context.getHandler())

    const request = context.switchToHttp().getRequest()

    const user = request.user
    const productId = request.params.id

    const designer = await this.designersService.findByUserId(user.id)

    const productAndDesigner =
      await this.productsService.findByProductAndDesignerId(
        productId,
        designer.id,
      )

    return !!productAndDesigner
  }
}

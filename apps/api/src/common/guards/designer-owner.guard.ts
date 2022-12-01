import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common'

import { DesignerService } from '../../designer/designer.service.js'
import { DESIGNER_SERVICE } from '../constants.js'

@Injectable()
export class DesignerOwner implements CanActivate {
  constructor(
    @Inject(DESIGNER_SERVICE)
    private readonly designerService: DesignerService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const { id: designerId } = request.params
    const { id: userId } = request.user

    const designer = await this.designerService.findOne(designerId)

    return designer.userId === userId
  }
}

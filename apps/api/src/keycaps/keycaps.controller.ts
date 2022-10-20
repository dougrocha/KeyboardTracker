import { Controller, Get, Inject, Param, Query } from '@nestjs/common'
import { KEYCAPS_SERVICE } from '../common/constants'
import { FindAllProductsDto } from '../products/dtos/queries/find-all-products.dto'
import { PaginationParams } from '../products/dtos/queries/pagination-params.dto'
import { KeycapsService } from './keycaps.service'

@Controller('keycaps')
export class KeycapsController {
  constructor(
    @Inject(KEYCAPS_SERVICE) private readonly keycapsService: KeycapsService,
  ) {}

  /**
   * GET /api/keycaps
   *
   * Returns all keycaps setss
   */
  @Get()
  async getAllKeycaps(
    @Query() { id, all }: FindAllProductsDto,
    @Query() { take, skip }: PaginationParams,
  ) {
    if (all) {
      take = undefined
      skip = undefined
    }
    return await this.keycapsService.findMany({
      take,
      skip,
      select: id ? { id: true } : undefined,
    })
  }

  /**
   * GET /api/keycaps/:id
   */
  @Get(':id')
  async getKeycapSet(@Param('id') id: string) {
    return await this.keycapsService.findOne(id)
  }
}

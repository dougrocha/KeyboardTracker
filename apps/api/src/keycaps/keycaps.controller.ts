import { Controller, Get, Inject, Param, Query } from '@nestjs/common'
import { KEYCAPS_SERVICE } from '../common/constants'
import { FindAllItemsDto } from '../items/dtos/find-all.dto'
import { PaginationParams } from '../items/dtos/pagination-params.dto'
import { KeycapsService } from './keycaps.service'

@Controller('keycaps')
export class KeycapsController {
  constructor(
    @Inject(KEYCAPS_SERVICE) private readonly keycapsService: KeycapsService,
  ) {}

  @Get()
  async getAllKeycaps(
    @Query() { id, all }: FindAllItemsDto,
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

  @Get(':id')
  async getKeycapSet(@Param('id') id: string) {
    return await this.keycapsService.findOne(id)
  }

  @Get(':id/interest-check')
  async getKeycapSetInterestCheck(@Param('id') id: string) {
    return
  }
}

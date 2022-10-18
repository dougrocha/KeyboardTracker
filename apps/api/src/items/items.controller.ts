import {
  Controller,
  Get,
  Inject,
  ParseBoolPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common'
import { KEYCAPS_SERVICE } from '../common/constants'
import { KeycapsService } from '../keycaps/keycaps.service'
import { FindAllItemsDto } from './dtos/find-all.dto'
import { PaginationParams } from './dtos/pagination-params.dto'

@Controller('items')
export class ItemsController {
  constructor(
    @Inject(KEYCAPS_SERVICE) private readonly keycapsService: KeycapsService,
  ) {}

  /**
   * Should only be used by static generation tool
   */
  @Get()
  async findAll(@Query() { take, skip }: PaginationParams) {
    const keycaps = await this.keycapsService.findMany({
      select: { id: true, type: true },
      take,
      skip,
    })

    // TODO: Implement other services
    // const keyboards = await this.keyboardsService.findMany({
    //   select: id ? { id } : undefined,
    //   take,
    //   skip,
    // })

    // const switches = await this.switchesService.findMany({
    //   select: id ? { id } : undefined,
    //   take,
    //   skip,
    // })

    // return [...keycaps, ...keyboards, ...switches]

    return keycaps
  }
}

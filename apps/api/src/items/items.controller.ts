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
import { FindAllItemsDto } from './dtos/findAll.dto'

@Controller('items')
export class ItemsController {
  constructor(
    @Inject(KEYCAPS_SERVICE) private readonly keycapsService: KeycapsService,
  ) {}

  @Get()
  async findAll(@Query() { id, take, skip }: FindAllItemsDto) {
    const keycaps = await this.keycapsService.findMany({
      select: id ? { id } : undefined,
      take,
      skip,
    })

    return keycaps
  }
}

import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common'
import { KEYCAPS_SERVICE } from '../common/constants'
import { KeycapsService } from './keycaps.service'

@Controller('keycaps')
export class KeycapsController {
  constructor(
    @Inject(KEYCAPS_SERVICE) private readonly keycapsService: KeycapsService,
  ) {}

  @Get('all')
  async getAllKeycaps() {
    return await this.keycapsService.getAll()
  }

  @Get(':id')
  async getKeycapSet(@Param('id', ParseIntPipe) id: number) {
    return await this.keycapsService.getOne(id)
  }
}

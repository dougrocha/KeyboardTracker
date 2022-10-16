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
    return await this.keycapsService.findMany()
  }

  @Get(':id')
  async getKeycapSet(@Param('id') id: string) {
    return await this.keycapsService.findOne(id)
  }
}

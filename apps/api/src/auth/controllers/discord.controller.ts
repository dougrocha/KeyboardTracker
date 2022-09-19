import { Controller, Get, Res, UseGuards } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'
import { DiscordAuthGuard } from '../../common/guards/auth.guard'

@Controller('discord')
export class DiscordController {
  constructor(private readonly configService: ConfigService) {}

  @Get('callback')
  @UseGuards(DiscordAuthGuard)
  redirect(@Res() res: Response) {
    return res.redirect(this.configService.get('APP_URL'))
  }

  @Get('login')
  @UseGuards(DiscordAuthGuard)
  login(@Res() res: Response) {
    return
  }
}

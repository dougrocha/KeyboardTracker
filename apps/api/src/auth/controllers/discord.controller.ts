import { Controller, Get, Res, UseGuards } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { User } from '@prisma/client'
import { Response } from 'express'

import { GetCurrentUser } from '../../common/decorators/getCurrentUser.decorator'
import { DiscordAuthGuard } from '../../common/guards/auth.guard'
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard'
import { FillDiscordUser } from '../../common/guards/discordUser.guard'

@Controller('discord')
export class DiscordAuthController {
  constructor(private readonly configService: ConfigService) {}

  /**
   * GET /api/auth/discord/callback
   */
  @Get('callback')
  @UseGuards(DiscordAuthGuard)
  redirect(@Res() res: Response) {
    return res.redirect(this.configService.get('APP_URL'))
  }

  /**
   * GET /api/auth/discord/logout
   */
  @Get('login')
  @UseGuards(DiscordAuthGuard)
  login() {
    return
  }

  /**
   * GET /api/auth/discord/logout
   */
  @Get('profile')
  @UseGuards(AuthenticatedGuard, FillDiscordUser)
  profile(@GetCurrentUser() user: User) {
    console.log('user', user)
  }
}

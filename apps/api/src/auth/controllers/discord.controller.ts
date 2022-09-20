import { Controller, Get, Res, UseGuards } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { User } from '@prisma/client'
import { Response } from 'express'
import { GetCurrentUser } from '../../common/decorators/getCurrentUser.decorator'
import { DiscordAuthGuard } from '../../common/guards/auth.guard'
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard'
import { FillDiscordUser } from '../../common/guards/discordUser.guard'
import { UsersController } from '../../users/users.controller'

@Controller('discord')
export class DiscordAuthController {
  constructor(private readonly configService: ConfigService) {}

  @Get('callback')
  @UseGuards(DiscordAuthGuard)
  redirect(@Res() res: Response) {
    return res.redirect(this.configService.get('APP_URL'))
  }

  @Get('login')
  @UseGuards(DiscordAuthGuard)
  login() {
    return
  }

  @Get('profile')
  @UseGuards(AuthenticatedGuard, FillDiscordUser)
  profile(@GetCurrentUser() user: User) {
    console.log('user', user)
  }
}

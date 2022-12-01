import { User } from '@meka/database'
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Request, Response } from 'express'

import { LOCAL_AUTH_SERVICE } from '../../common/constants.js'
import { GetCurrentUser } from '../../common/decorators/current-user.decorator.js'
import { LocalAuthGuard } from '../../common/guards/auth.guard.js'
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard.js'
import { CreateUserDto } from '../../user/dto/create-user.dto.js'
import { LocalAuthService } from '../services/local.service.js'

@Controller()
export class LocalAuthController {
  constructor(
    @Inject(LOCAL_AUTH_SERVICE) private readonly authService: LocalAuthService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * GET /api/auth/login
   *
   * This is the route for login.
   */
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return await this.authService.login(email, password)
  }

  /**
   * GET /api/auth/register
   *
   * This is the route for registration.
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() createUserDto: CreateUserDto,
    @Body('password') password: string,
  ) {
    const user = await this.authService.register(createUserDto, password)
    return {
      msg: 'User created successfully',
      userId: user.id,
    }
  }

  /**
   * GET /api/auth/protected
   *
   * This is the route for protected content.
   * Will keep track of amount of visits.
   */
  @Get('protected')
  @UseGuards(AuthenticatedGuard)
  async protected(@GetCurrentUser() user: User) {
    if (!user) return { isLoggedIn: false }
    return { isLoggedIn: true, user }
  }

  /**
   * GET /api/auth/logout
   */
  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy(() => {
      res.redirect(this.configService.get('APP_URL'))
      return {
        msg: 'User logged out',
      }
    })
  }
}

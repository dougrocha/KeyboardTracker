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
import { Request, Response } from 'express'
import { CreateUserDto } from '../../users/dto/create-user.dto'
import { LocalAuthGuard } from '../../common/guards/auth.guard'
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard'
import { User } from '@prisma/client'
import { ConfigService } from '@nestjs/config'
import { LOCAL_AUTH_SERVICE } from '../../common/constants'
import { LocalAuthService } from '../services/local.service'
import { GetCurrentUser } from '../../common/decorators/getCurrentUser.decorator'

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
  async login() {
    return
  }

  /**
   * GET /api/auth/signup
   *
   * This is the route for registration.
   */
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() createUserDto: CreateUserDto,
    @Body('password') password: string,
    @Res() res: Response,
  ) {
    const user = await this.authService.register(createUserDto, password)

    res.json({
      msg: 'User created successfully',
      email: user.email,
      username: user.username,
    })

    return
  }

  /**
   * GET /api/auth/protected
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

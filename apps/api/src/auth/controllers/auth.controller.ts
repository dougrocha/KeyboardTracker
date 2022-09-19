import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { AUTH_SERVICE } from '../../common/constants'
import { CreateUserDto } from '../../users/dto/create-user.dto'
import { AuthService } from '../auth.service'
import * as bcrypt from 'bcrypt'
import { LocalAuthGuard } from '../../common/guards/auth.guard'
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard'
import { User } from '@prisma/client'
import { ConfigService } from '@nestjs/config'

@Controller()
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * GET /api/auth/login
   *
   * This is the route for login.
   */
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async localLogin(@Req() req: Request) {
    return {
      msg: 'User logged in',
      user: req.user,
    }
  }

  /**
   * GET /api/auth/register
   *
   * This is the route for registration.
   */
  @Post('signup')
  async localRegister(
    @Body() createUserDto: CreateUserDto,
    @Body('password') password: string,
  ) {
    const saltOfRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltOfRounds)

    const user = await this.authService.registerLocalUser({
      ...createUserDto,
      password: hashedPassword,
    })

    return {
      msg: 'User created successfully',
      id: user.id,
      username: user.username,
    }
  }

  @Get('protected')
  @UseGuards(AuthenticatedGuard)
  async protected(@Req() req: Request) {
    const { password, ...user } = req.user as User
    return user
  }

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

import { User } from '@meka/database'
import {
  Get,
  UseGuards,
  Post,
  Body,
  Delete,
  ParseIntPipe,
  Param,
  Inject,
  Controller,
} from '@nestjs/common'

import { USER_SERVICE } from '../../common/constants.js'
import { GetCurrentUser } from '../../common/decorators/current-user.decorator.js'
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard.js'
import { UserService } from '../services/user.service.js'

@Controller()
export class UserFavoritesController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserService,
  ) {}

  @Get('me/favorites')
  @UseGuards(AuthenticatedGuard)
  async findFavorites(@GetCurrentUser() user: User) {
    return await this.userService.findUserFavorites(user.id)
  }

  @Post('me/favorites')
  @UseGuards(AuthenticatedGuard)
  async addFavorite(@GetCurrentUser() user: User, @Body('id') id: string) {
    return await this.userService.addFavorite(user.id, id)
  }

  @Delete('me/favorites')
  async removeFavorite(
    @GetCurrentUser() user: User,
    @Body('id', ParseIntPipe) id: number,
  ) {
    return await this.userService.removeFavorite(user.id, id)
  }

  @Get(':id/favorites')
  async findFavoritesById(@Param('id') id: string) {
    return await this.userService.findUserFavorites(id)
  }
}

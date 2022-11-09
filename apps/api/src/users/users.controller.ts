import { createReadStream } from 'fs'
import { access, constants } from 'fs/promises'

import { InjectQueue } from '@nestjs/bull'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  StreamableFile,
  UseGuards,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { User } from '@prisma/client'
import { Queue } from 'bull'
import { Response } from 'express'

import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './services/users.service'

import {
  IMAGES_SERVICE,
  SNOWFLAKE_SERVICE,
  USERS_SERVICE,
} from '../common/constants'
import { GetCurrentUser } from '../common/decorators/getCurrentUser.decorator'
import { ImageNotFoundException } from '../common/exceptions/imageNotFound.exception'
import { AuthenticatedGuard } from '../common/guards/authenticated.guard'
import { multerImageOptions } from '../config/multer.config'
import { ImagesService } from '../images/images.service'
import { SnowflakeService } from '../snowflake/snowflake.module'

@Controller()
export class UsersController {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: UsersService,
    @Inject(IMAGES_SERVICE) private readonly imagesService: ImagesService,
    @InjectQueue('images') private readonly imagesQueue: Queue,
    @Inject(SNOWFLAKE_SERVICE) private readonly snowflake: SnowflakeService,
  ) {}

  @Get('me')
  @UseGuards(AuthenticatedGuard)
  async findById(@GetCurrentUser() user: User) {
    return user
  }

  @Get('me/connections')
  @UseGuards(AuthenticatedGuard)
  async findAllConnections(@GetCurrentUser() user: User) {
    return this.usersService.findAllConnections(user.id)
  }

  @Patch('me')
  @UseGuards(AuthenticatedGuard)
  async update(
    @GetCurrentUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.usersService.update(user.id, updateUserDto)
    return { ...updatedUser, password: undefined }
  }

  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthenticatedGuard)
  async delete(@GetCurrentUser() user: User) {
    const deletedUser = await this.usersService.delete(user.id)
    return { ...deletedUser, password: undefined }
  }

  @Post('avatars')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(FileInterceptor('avatar', multerImageOptions))
  async uploadFile(
    @GetCurrentUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const id = this.snowflake.nano()

    // Add image to Optimization queue
    await this.imagesQueue.add('optimize-avatar', {
      file,
      folder: [user.id],
      fileName: id,
    })

    // Delete the old image from the disk
    await this.imagesQueue.add('delete-avatar', {
      file,
      folder: [user.id],
      fileName: user.avatar,
    })

    // Update User with new avatar id
    await this.usersService.update(user.id, {
      avatar: id,
    })
    return { fileId: id }
  }

  @Get('avatars/:id/:avatar_id')
  @HttpCode(HttpStatus.OK)
  async findProfileImage(
    @Param('id') id: string,
    @Param('avatar_id') avatar: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!id || !avatar)
      throw new HttpException(
        'Something went wrong. The URL contains errors.',
        HttpStatus.NOT_FOUND,
      )

    const path = this.imagesService.joinFilePath(id, avatar) + '.webp'
    return await access(path, constants.F_OK | constants.R_OK)
      .then(() => {
        res.set('Content-Type', 'image/webp')
        res.header('Content-Disposition', `inline, filename=${avatar}.webp`)
        return new StreamableFile(createReadStream(path))
      })
      .catch(() => {
        throw new ImageNotFoundException()
      })
  }

  @Get('me/favorites')
  @UseGuards(AuthenticatedGuard)
  async findFavorites(@GetCurrentUser() user: User) {
    return await this.usersService.findFavorites(user.id)
  }

  @Post('me/favorites')
  @UseGuards(AuthenticatedGuard)
  async addFavorite(@GetCurrentUser() user: User, @Body('id') id: string) {
    return await this.usersService.addFavorite(user.id, id)
  }

  @Delete('me/favorites')
  async removeFavorite(
    @GetCurrentUser() user: User,
    @Body('id', ParseIntPipe) id: number,
  ) {
    return await this.usersService.removeFavorite(user.id, id)
  }

  @Get(':id/favorites')
  async findFavoritesById(@Param('id') id: string) {
    return await this.usersService.findFavorites(id)
  }
}

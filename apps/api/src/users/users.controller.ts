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
  DELETE_AVATAR,
  JobImageType,
  OPTIMIZE_AVATAR,
} from './usersImages.processor'

import {
  DESIGNERS_SERVICE,
  IMAGES_SERVICE,
  SNOWFLAKE_SERVICE,
  USERS_SERVICE,
} from '../common/constants'
import { GetCurrentUser } from '../common/decorators/getCurrentUser.decorator'
import { ImageNotFoundException } from '../common/exceptions/imageNotFound.exception'
import { AuthenticatedGuard } from '../common/guards/authenticated.guard'
import { multerImageOptions } from '../config/multer.config'
import { DesignersService } from '../designers/designers.service'
import { ImagesService } from '../images/images.service'
import { SnowflakeService } from '../snowflake/snowflake.module'

@Controller()
export class UsersController {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: UsersService,
    @Inject(DESIGNERS_SERVICE)
    private readonly designersService: DesignersService,
    @Inject(IMAGES_SERVICE) private readonly imagesService: ImagesService,
    @InjectQueue('images') private readonly imagesQueue: Queue<JobImageType>,
    @Inject(SNOWFLAKE_SERVICE) private readonly snowflake: SnowflakeService,
  ) {}

  @Get('me')
  @UseGuards(AuthenticatedGuard)
  async findById(@GetCurrentUser() user: User) {
    return user
  }

  @Get('me/designer')
  @UseGuards(AuthenticatedGuard)
  async getDesignerInfo(@GetCurrentUser() user: User) {
    return await this.designersService.findByUserId(user.id)
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
    if (user.id != updateUserDto.id)
      throw new HttpException(
        'You can only update your own profile',
        HttpStatus.FORBIDDEN,
      )

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

  @Post('me/avatar')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(FileInterceptor('avatar', multerImageOptions))
  async uploadFile(
    @GetCurrentUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const currAvatar = await this.usersService.findById(user.id)

    if (currAvatar) {
      await this.imagesQueue.add(DELETE_AVATAR, {
        folder: [user.id],
        fileName: currAvatar.avatar,
      })
    }

    const fileName = this.snowflake.nextId()

    // Add image to Optimization queue
    await this.imagesQueue.add(OPTIMIZE_AVATAR, {
      file,
      folder: [user.id],
      fileName,
    })

    // Update User with new avatar id
    await this.usersService.update(user.id, {
      avatar: fileName,
    })

    return { fileId: fileName }
  }

  @Get('/:id/avatar/:avatar_id')
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

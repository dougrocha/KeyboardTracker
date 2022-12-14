import { createReadStream } from 'fs'
import { access, constants } from 'fs/promises'

import { User } from '@meka/database'
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
  Res,
  UploadedFile,
  StreamableFile,
  UseGuards,
  UseInterceptors,
  Req,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { FileInterceptor } from '@nestjs/platform-express'
import { Queue } from 'bull'
import { Request, Response } from 'express'

import {
  DESIGNER_SERVICE,
  IMAGE_SERVICE,
  SNOWFLAKE_SERVICE,
  USER_SERVICE,
  VENDOR_SERVICE,
} from '../../common/constants.js'
import { GetCurrentUser } from '../../common/decorators/current-user.decorator.js'
import { ImageNotFoundException } from '../../common/exceptions/imageNotFound.exception.js'
import { AuthenticatedGuard } from '../../common/guards/authenticated.guard.js'
import { multerImageOptions } from '../../config/multer.config.js'
import { DesignerService } from '../../designer/designer.service.js'
import { ImageService } from '../../image/image.service.js'
import { SnowflakeService } from '../../snowflake/snowflake.module.js'
import { VendorService } from '../../vendor/vendor.service.js'
import { UpdateUserDto } from '../dto/update-user.dto.js'
import { UserService } from '../services/user.service.js'
import {
  DELETE_AVATAR,
  JobImageType,
  OPTIMIZE_AVATAR,
} from '../userImage.processor.js'

@Controller()
export class UsersController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: UserService,
    @Inject(DESIGNER_SERVICE)
    private readonly designerService: DesignerService,
    @Inject(VENDOR_SERVICE) private readonly vendorService: VendorService,
    @Inject(IMAGE_SERVICE) private readonly imagesService: ImageService,
    @InjectQueue('images') private readonly imagesQueue: Queue<JobImageType>,
    @Inject(SNOWFLAKE_SERVICE) private readonly snowflake: SnowflakeService,
    private readonly configService: ConfigService,
  ) {}

  @Get('me')
  @UseGuards(AuthenticatedGuard)
  async findById(@GetCurrentUser() user: User) {
    return user
  }

  @Get('me/designer')
  @UseGuards(AuthenticatedGuard)
  async getDesignerInfo(@GetCurrentUser() user: User) {
    return await this.designerService.findUserDesigner(user.id)
  }

  @Get('me/vendors')
  @UseGuards(AuthenticatedGuard)
  async getVendors(@GetCurrentUser() user: User) {
    return await this.vendorService.findUserVendors(user.id)
  }

  @Get('me/connections')
  @UseGuards(AuthenticatedGuard)
  async findAllConnections(@GetCurrentUser() user: User) {
    return this.userService.findUserConnections(user.id)
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

    const updatedUser = await this.userService.update(user.id, updateUserDto)
    return { ...updatedUser, password: undefined }
  }

  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthenticatedGuard)
  async delete(
    @Req() req: Request,
    @Res() res: Response,
    @GetCurrentUser() user: User,
  ) {
    await this.userService.delete(user.id)
    req.session.destroy(() => {
      res.redirect(this.configService.get('APP_URL'))
      return {
        msg: 'User logged out',
      }
    })
  }

  @Patch('me/avatar')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(FileInterceptor('avatar', multerImageOptions))
  async uploadFile(
    @GetCurrentUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file)
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST)

    const currAvatar = await this.userService.findUserAvatar(user.id)

    if (currAvatar) {
      await this.imagesQueue.add(
        DELETE_AVATAR,
        {
          folder: [user.id],
          fileName: currAvatar.avatar,
        },
        { delay: 5000 },
      )
    }

    const fileName = this.snowflake.nextId()

    // Add image to Optimization queue
    await this.imagesQueue.add(OPTIMIZE_AVATAR, {
      file,
      folder: [user.id],
      fileName,
    })

    // Update User with new avatar id
    await this.userService.update(user.id, {
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
}

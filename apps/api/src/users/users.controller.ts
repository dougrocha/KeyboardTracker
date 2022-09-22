import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { User } from '@prisma/client'
import { Response } from 'express'
import { createReadStream } from 'fs'
import { extname, join } from 'path'
import { USERS_SERVICE } from '../common/constants'
import { GetCurrentUser } from '../common/decorators/getCurrentUser.decorator'
import { AuthenticatedGuard } from '../common/guards/authenticated.guard'
import { SharpPipe } from '../common/pipes/SharpPipe.pipe'
import { multerConfig, multerImageOptions } from '../config/multer.config'
import { UsersService } from './services/users.service'

@Controller()
export class UsersController {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: UsersService,
  ) {}

  // @Get(':id')
  // async findById(@Param('id') id: string) {
  //   return await this.usersService.findById(id)
  // }

  // @Patch(':id')
  // @UseGuards(AuthenticatedGuard)
  // async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return await this.usersService.update(id, updateUserDto)
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return await this.usersService.delete(id)
  // }

  @Post('avatar')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(FileInterceptor('file', multerImageOptions()))
  async uploadFile(
    @UploadedFile(
      SharpPipe({
        folder: 'avatars',
        fileType: 'webp',
      }),
    )
    file: string,
    @GetCurrentUser() user: User,
  ) {
    await this.usersService.update(user.id, {
      avatar: file,
    })
    return { fileName: file }
  }

  @Get('avatar')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthenticatedGuard)
  findProfileImage(
    @GetCurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    const fileName = user.avatar

    const stream = createReadStream(
      join(process.cwd(), multerConfig.dest, 'avatars', fileName),
    )

    res.set({
      'Content-Disposition': `inline; filename="${fileName}"`,
      'Content-Type': 'image/webp',
    })

    return new StreamableFile(stream)
  }
}

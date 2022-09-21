import {
  ConsoleLogger,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { User } from '@prisma/client'
import { Response } from 'express'
import { join } from 'path'
import { Observable, of } from 'rxjs'
import { USERS_SERVICE } from '../common/constants'
import { GetCurrentUser } from '../common/decorators/getCurrentUser.decorator'
import { AuthenticatedGuard } from '../common/guards/authenticated.guard'
import { multerConfig, multerOptions } from '../config/multer.config'
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
  @UseInterceptors(FileInterceptor('file', multerOptions('avatar')))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @GetCurrentUser() user: User,
  ) {
    const { avatar } = await this.usersService.update(user.id, {
      avatar: file.filename,
    })

    return { fileName: avatar }
  }

  @Get('avatar')
  findProfileImage(@GetCurrentUser() user: User, @Res() res: Response) {
    return res.sendFile(
      join(process.cwd(), multerConfig.dest, 'avatar', user.avatar),
    )
  }
}

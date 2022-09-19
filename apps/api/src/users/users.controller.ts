import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common'
import { NotFoundError } from '@prisma/client/runtime'
import { USERS_SERVICE } from '../common/constants'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './services/users.service'

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: UsersService,
  ) {}

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findById(id)
    // if (!user) return null
    // const { password, ...foundUser } = user
    return user
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.delete(id)
  }
}

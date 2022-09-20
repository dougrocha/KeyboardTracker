import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common'
import { USERS_SERVICE } from '../common/constants'
import { AuthenticatedGuard } from '../common/guards/authenticated.guard'
import { UpdateUserDto } from './dto/update-user.dto'
import { UsersService } from './services/users.service'

@Controller('users')
export class UsersController {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersService: UsersService,
  ) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.usersService.findById(id)
  }

  @Patch(':id')
  @UseGuards(AuthenticatedGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(id)
  }
}

import { Inject, Injectable } from '@nestjs/common'
import { PrismaClient, User } from '@prisma/client'
import { PRISMA_SERVICE, SNOWFLAKE_SERVICE } from '../../common/constants'
import {
  SnowflakeModule,
  SnowflakeService,
} from '../../snowflake/snowflake.module'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaClient,
    @Inject(SNOWFLAKE_SERVICE) private readonly snowflake: SnowflakeService,
  ) {}

  async create(user: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        id: this.snowflake.nextId(),
        ...user,
      },
    })
  }

  async update(id: string, user: UpdateUserDto) {
    return await this.prisma.user.update({ where: { id }, data: user })
  }

  async findById(id: string, password = false) {
    return await this.prisma.user.findUnique({
      where: { id },
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } })
  }

  async delete(id: string) {
    return await this.prisma.user.delete({ where: { id } })
  }
}

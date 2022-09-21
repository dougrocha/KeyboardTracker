import { Inject, Injectable } from '@nestjs/common'
import { Prisma, PrismaClient, User } from '@prisma/client'
import { PRISMA_SERVICE } from '../../common/constants'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(@Inject(PRISMA_SERVICE) private readonly prisma: PrismaClient) {}

  async create(user: CreateUserDto) {
    return await this.prisma.user.create({ data: user })
  }

  async update(id: string, user: UpdateUserDto) {
    return await this.prisma.user.update({ where: { id }, data: user })
  }

  async findById(id: string) {
    return await this.prisma.user.findUnique({ where: { id } })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } })
  }

  async delete(id: string) {
    return await this.prisma.user.delete({ where: { id } })
  }
}

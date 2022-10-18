import { Module } from '@nestjs/common'
import {
  DISCORD_USERS_SERVICE,
  PRISMA_SERVICE,
  USERS_SERVICE,
} from '../common/constants'
import { UsersService } from './services/users.service'
import { UsersController } from './users.controller'
import { PrismaService } from 'nestjs-prisma'
import { DiscordUsersService } from './services/discord.service'
import { ImagesModule } from '../images/images.module'
import { BullModule } from '@nestjs/bull'
import { UsersImagesProcessor } from './usersImages.processor'

@Module({
  imports: [
    ImagesModule.register({ path: ['users'] }),
    BullModule.registerQueue(
      {
        name: 'images',
      },
      {
        defaultJobOptions: {
          attempts: 3,
          removeOnComplete: true,
          removeOnFail: {
            /**
             * This will stay 10 minutes to allow the
             * user to see that their image did not upload properly.
             */
            age: 60 * 10, // 10 minutes
          },
        },
      },
    ),
  ],
  providers: [
    { provide: USERS_SERVICE, useClass: UsersService },
    { provide: PRISMA_SERVICE, useClass: PrismaService },
    { provide: DISCORD_USERS_SERVICE, useClass: DiscordUsersService },
    UsersImagesProcessor,
  ],
  exports: [{ provide: USERS_SERVICE, useClass: UsersService }],
  controllers: [UsersController],
})
export class UsersModule {}

import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'

import { DiscordUserService } from './services/discord.service'
import { UserService } from './services/user.service'
import { UsersController } from './user.controller'
import { UsersImagesProcessor } from './userImage.processor'

import {
  DESIGNER_SERVICE,
  DISCORD_USER_SERVICE,
  PRISMA_SERVICE,
  USER_SERVICE,
  VENDOR_SERVICE,
} from '../common/constants'
import { DesignerService } from '../designer/designer.service'
import { ImageModule } from '../image/image.module'
import { VendorService } from '../vendor/vendor.service'

@Module({
  imports: [
    ImageModule.register({ path: ['users'] }),
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
    { provide: USER_SERVICE, useClass: UserService },
    { provide: PRISMA_SERVICE, useClass: PrismaService },
    { provide: DISCORD_USER_SERVICE, useClass: DiscordUserService },
    { provide: DESIGNER_SERVICE, useClass: DesignerService },
    { provide: VENDOR_SERVICE, useClass: VendorService },
    UsersImagesProcessor,
  ],
  exports: [{ provide: USER_SERVICE, useClass: UserService }],
  controllers: [UsersController],
})
export class UserModule {}

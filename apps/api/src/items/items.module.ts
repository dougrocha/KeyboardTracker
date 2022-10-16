import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { KEYCAPS_SERVICE, PRISMA_SERVICE } from '../common/constants'
import { KeycapsService } from '../keycaps/keycaps.service'
import { ItemsController } from './items.controller'

@Module({
  imports: [],
  providers: [
    { provide: KEYCAPS_SERVICE, useClass: KeycapsService },
    { provide: PRISMA_SERVICE, useClass: PrismaService },
  ],
  controllers: [ItemsController],
})
export class ItemsModule {}

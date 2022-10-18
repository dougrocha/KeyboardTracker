import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import {
  ITEMS_SERVICE,
  KEYCAPS_SERVICE,
  PRISMA_SERVICE,
} from '../common/constants'
import { KeycapsService } from '../keycaps/keycaps.service'
import { ItemsController } from './items.controller'
import { ItemsService } from './items.service'

@Module({
  providers: [
    { provide: KEYCAPS_SERVICE, useClass: KeycapsService },
    { provide: PRISMA_SERVICE, useClass: PrismaService },
    { provide: ITEMS_SERVICE, useClass: ItemsService },
  ],
  controllers: [ItemsController],
  exports: [ITEMS_SERVICE],
})
export class ItemsModule {}

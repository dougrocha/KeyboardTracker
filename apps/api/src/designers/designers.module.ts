import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import {
  DESIGNERS_SERVICE,
  KEYCAPS_SERVICE,
  PRISMA_SERVICE,
} from '../common/constants'
import { KeycapsService } from '../keycaps/keycaps.service'
import { DesignersController } from './designers.controller'
import { DesignersService } from './designers.service'

@Module({
  controllers: [DesignersController],
  providers: [
    {
      provide: DESIGNERS_SERVICE,
      useClass: DesignersService,
    },
    {
      provide: PRISMA_SERVICE,
      useValue: PrismaService,
    },
    {
      provide: KEYCAPS_SERVICE,
      useValue: KeycapsService,
    },
  ],
})
export class DesignersModule {}

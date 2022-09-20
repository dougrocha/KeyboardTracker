import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { KEYCAPS_SERVICE, PRISMA_SERVICE } from '../common/constants'
import { KeycapsController } from './keycaps.controller'
import { KeycapsService } from './keycaps.service'

@Module({
  controllers: [KeycapsController],
  providers: [
    { provide: KEYCAPS_SERVICE, useClass: KeycapsService },
    { provide: PRISMA_SERVICE, useValue: PrismaService },
  ],
})
export class KeycapsModule {}

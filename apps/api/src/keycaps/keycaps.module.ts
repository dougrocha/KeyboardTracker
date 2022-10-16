import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { KEYCAPS_SERVICE, PRISMA_SERVICE } from '../common/constants'
import { KeycapsController } from './keycaps.controller'
import { KeycapsService } from './keycaps.service'

@Module({
  controllers: [KeycapsController],
  providers: [
    { provide: PRISMA_SERVICE, useClass: PrismaService },
    { provide: KEYCAPS_SERVICE, useClass: KeycapsService },
  ],
  exports: [{ provide: KEYCAPS_SERVICE, useClass: KeycapsService }],
})
export class KeycapsModule {}

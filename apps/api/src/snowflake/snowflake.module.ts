import { DynamicModule, Module } from '@nestjs/common'
import intFormat from 'biguint-format'
import FlakeId from 'flake-idgen'

const nanoid = require('nanoid')

import { SNOWFLAKE_SERVICE } from '../common/constants.js'

interface FlakeOptions {
  id?: number
  epoch?: number
  datacenter?: number
  worker?: number
}

interface SnowflakeModuleOptions {
  global?: boolean
  options?: FlakeOptions
}

export const SNOWFLAKE_CLIENT_TOKEN = 'SNOWFLAKE_CLIENT_TOKEN'

@Module({
  providers: [
    {
      provide: SNOWFLAKE_SERVICE,
      inject: [SNOWFLAKE_CLIENT_TOKEN],
      useFactory: async (flake): Promise<SnowflakeService> => ({
        nextId: () => intFormat(flake.next(), 'dec'),
        next: () => flake.next(),
        id: flake.id,
        datacenter: flake.datacenter,
        worker: flake.worker,
        nano: (size: number) => nanoid(size),
      }),
    },
  ],
  exports: [SNOWFLAKE_SERVICE],
})
export class SnowflakeModule {
  static forRoot(options?: SnowflakeModuleOptions): DynamicModule {
    const snowflakeProvider = {
      provide: SNOWFLAKE_CLIENT_TOKEN,
      useValue: new FlakeId(options?.options),
    }

    return {
      module: SnowflakeModule,
      providers: [snowflakeProvider],
      global: options?.global,
    }
  }
}

export interface SnowflakeService {
  next(): string
  nextId(): string
  readonly id: string
  readonly datacenter: number
  readonly worker: number
  nano(size?: number): string
}

import { Logger, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as Redis from 'redis'

import { REDIS } from '../common/constants.js'

@Module({
  providers: [
    {
      provide: REDIS,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redisClient = Redis.createClient({
          url: configService.get('REDIS_URL'),
          legacyMode: true,
        })

        await redisClient.connect()

        redisClient.on('error', (err) =>
          Logger.error('Could not establish a connection with redis. ' + err),
        )
        redisClient.on('connect', () =>
          Logger.log('Connected to redis successfully'),
        )

        return redisClient
      },
    },
  ],
  exports: [REDIS],
})
export class RedisModule {}

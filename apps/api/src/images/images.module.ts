import { DynamicModule, Module } from '@nestjs/common'

import { ImagesService } from './images.service'

import { IMAGES_SERVICE } from '../common/constants'

export interface ImagesModuleOptions {
  path: string[]
}

@Module({})
export class ImagesModule {
  static register(options: ImagesModuleOptions): DynamicModule {
    return {
      module: ImagesModule,
      providers: [
        {
          provide: 'IMAGES_CONFIG',
          useValue: options,
        },
        {
          provide: IMAGES_SERVICE,
          useClass: ImagesService,
        },
      ],
      exports: [IMAGES_SERVICE],
    }
  }
}

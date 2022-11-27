import { DynamicModule, Module } from '@nestjs/common'

import { ImagesService } from './image.service'

import { IMAGE_SERVICE } from '../common/constants'

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
          provide: IMAGE_SERVICE,
          useClass: ImagesService,
        },
      ],
      exports: [IMAGE_SERVICE],
    }
  }
}

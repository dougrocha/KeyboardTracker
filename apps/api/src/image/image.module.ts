import { DynamicModule, Module } from '@nestjs/common'

import { ImageService } from './image.service.js'

import { IMAGE_SERVICE } from '../common/constants.js'

export interface ImageModuleOptions {
  path: string[]
}

@Module({})
export class ImageModule {
  static register(options: ImageModuleOptions): DynamicModule {
    return {
      module: ImageModule,
      providers: [
        {
          provide: 'IMAGE_CONFIG',
          useValue: options,
        },
        {
          provide: IMAGE_SERVICE,
          useClass: ImageService,
        },
      ],
      exports: [IMAGE_SERVICE],
    }
  }
}

import { Process, Processor } from '@nestjs/bull'
import { Inject } from '@nestjs/common'
import { Job } from 'bull'

import { IMAGE_SERVICE } from '../common/constants'
import { ImageService } from '../image/image.service'

export interface JobImageType {
  file?: Express.Multer.File
  folder: string[]
  fileName: string
}

export const OPTIMIZE_AVATAR = 'OPTIMIZE_AVATAR'
export const DELETE_AVATAR = 'DELETE_AVATAR'

@Processor('images')
export class UsersImagesProcessor {
  constructor(
    @Inject(IMAGE_SERVICE) private readonly imagesService: ImageService,
  ) {}

  @Process(OPTIMIZE_AVATAR)
  async optimizeAvatar(job: Job<JobImageType>) {
    await this.imagesService.saveImage({
      file: job.data.file,
      folder: job.data.folder,
      fileName: job.data.fileName,
    })
  }

  @Process(DELETE_AVATAR)
  async deleteAvatar(job: Job<JobImageType>) {
    await this.imagesService.deleteImage({
      file: job.data.file,
      folder: job.data.folder,
      fileName: job.data.fileName,
    })
  }
}

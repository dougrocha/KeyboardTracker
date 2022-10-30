import { Process, Processor } from '@nestjs/bull'
import { Inject } from '@nestjs/common'
import { Job } from 'bull'
import { IMAGES_SERVICE } from '../common/constants'
import { ImagesService } from '../images/images.service'

interface JobImageType {
  file: Express.Multer.File
  folder: string[]
  fileName: string
}

@Processor('images')
export class UsersImagesProcessor {
  constructor(
    @Inject(IMAGES_SERVICE) private readonly imagesService: ImagesService,
  ) {}

  @Process('optimize-avatar')
  async optimizeAvatar(job: Job<JobImageType>) {
    await this.imagesService.saveImage({
      file: job.data.file,
      folder: job.data.folder,
      fileName: job.data.fileName,
    })
  }

  @Process('delete-avatar')
  async deleteAvatar(job: Job<JobImageType>) {
    await this.imagesService.deleteImage({
      file: job.data.file,
      folder: job.data.folder,
      fileName: job.data.fileName,
    })
  }
}

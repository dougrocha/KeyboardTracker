import { access, mkdir, unlink } from 'fs/promises'
import { join } from 'path'

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as sharp from 'sharp'

import { ImageModuleOptions } from './image.module'

import { SNOWFLAKE_SERVICE } from '../common/constants'
import { SupportedFiles, SupportedFilesType } from '../config/multer.config'
import { SnowflakeService } from '../snowflake/snowflake.module'

@Injectable()
export class ImageService {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    @Inject('IMAGE_CONFIG') private readonly options: ImageModuleOptions,
    @Inject(SNOWFLAKE_SERVICE) private readonly snowflake: SnowflakeService,
  ) {}

  private readonly SupportedAnimatedFiles: SupportedFilesType[] = [
    SupportedFiles.GIF,
    SupportedFiles.WEBP,
  ]

  async saveImage(options: ImageOptions) {
    const {
      file,
      width = 128,
      height = 128,
      fit = 'cover',
      fileType = options.fileType ?? SupportedFiles.WEBP,
      animated = this.SupportedAnimatedFiles.includes(fileType),
      folder,
      fileName = this.snowflake.nano(),
    } = options

    const fileWithExt = `${fileName}.${fileType}`

    await this.createDirectory(...folder)

    const filePath = this.joinFilePath(...folder, fileWithExt)

    // Due to some unknown reason. When file is from queue.
    // The buffer is change from Buffer to a object with a buffer property.
    // This ensures that the buffer is a Buffer.
    const fileBuffer = Buffer.isBuffer(file.buffer)
      ? file.buffer
      : Buffer.from((file.buffer as any).data)

    // Animated must true for all animated images.
    const pipeline: sharp.Sharp = sharp(fileBuffer, {
      animated,
    })

    pipeline.resize(width, height, { fit })

    if (animated) {
      // Animated images must highest quality
      // TODO: Adjust settings for max efficiency
      pipeline.webp({ quality: 100, effort: 3 })
    } else {
      // This keeps image quality high while being really fast.
      pipeline.webp({ nearLossless: true, quality: 50 })
    }

    pipeline.toFile(filePath).catch(() => {
      return new HttpException(
        'File failed to save. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    })

    return fileName
  }

  public async deleteImage(options: ImageOptions) {
    const { folder, fileName } = options

    const filePath = this.joinFilePath(...folder, fileName) + '.webp'

    try {
      await access(filePath)
      await unlink(filePath)
    } catch (error) {
      // Do nothing
    }
  }

  /**
   * @param name File name
   * @returns A supported file extension
   */
  private getExtension(name: string): SupportedFilesType {
    return name.split('.').pop() as SupportedFilesType
  }

  private async createDirectory(...paths: string[]) {
    return mkdir(
      join(
        process.cwd(),
        this.configService.get('UPLOADS_PATH'),
        ...this.options.path,
        ...paths,
      ),
      {
        recursive: true,
      },
    )
  }

  public joinFilePath(...paths: Partial<string[]>) {
    return join(
      process.cwd(),
      this.configService.get('UPLOADS_PATH'),
      ...this.options.path,
      ...paths,
    )
  }
}

export interface ImageOptions {
  /**
   * The folder where the file will be saved
   * @default 'uploads'
   *
   * @example 'avatars' returns 'uploads/avatars'
   * @example 'images/user_id' returns 'uploads/images/user_id'
   */
  folder?: string[]
  /**
   * Overwrite default width of 128px
   */
  width?: number
  /**
   * Overwrite default height of 128px
   */
  height?: number
  animated?: boolean
  fileType?: SupportedFilesType
  fit?: keyof sharp.FitEnum
  fileName?: string
  file: Express.Multer.File
}

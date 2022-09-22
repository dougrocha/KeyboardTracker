import { Inject, Injectable, mixin, PipeTransform, Type } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { mkdir } from 'fs/promises'
import { extname, join } from 'path'
import * as sharp from 'sharp'
import { generateFileName, SupportedFileType } from '../../config/multer.config'

interface SharpPipeOptions {
  folder?: string
  width?: number
  height?: number
  fileType?: SupportedFileType
  fit?: keyof sharp.FitEnum
}

export const SharpPipe = (
  options?: SharpPipeOptions,
): Type<PipeTransform<Express.Multer.File, Promise<string>>> => {
  @Injectable()
  class _SharpPipe
    implements PipeTransform<Express.Multer.File, Promise<string>>
  {
    constructor(
      @Inject(ConfigService) private readonly configService: ConfigService,
    ) {}

    async transform(image: Express.Multer.File): Promise<string> {
      const fileExtension = extname(image.originalname).replace(
        '.',
        '',
      ) as SupportedFileType

      const filename = generateFileName(
        image,
        options?.fileType ?? fileExtension,
      )

      const folder = options?.folder ?? ''

      const resizedImage: sharp.Sharp = await sharp(image.buffer)
        .resize(128, 128, {
          width: options?.width,
          height: options?.height,
          fit: options?.fit ?? 'cover',
        })
        [options?.fileType ?? 'webp']({ effort: 3 })

      await mkdir(
        join(process.cwd(), this.configService.get('UPLOADS_PATH'), folder),
        {
          recursive: true,
        },
      )

      resizedImage.toFile(
        join(
          process.cwd(),
          this.configService.get('UPLOADS_PATH'),
          folder,
          filename,
        ),
      )

      return filename
    }
  }

  return mixin(_SharpPipe)
}

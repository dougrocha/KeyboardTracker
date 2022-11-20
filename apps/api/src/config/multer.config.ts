import { HttpException, HttpStatus } from '@nestjs/common'
import { MulterModuleOptions } from '@nestjs/platform-express'
import { memoryStorage } from 'multer'

export const multerConfig = {
  dest: process.env.UPLOADS_PATH,
  fileSize: +process.env.MAX_FILE_UPLOAD_SIZE,
}

export const multerImageOptions: MulterModuleOptions = {
  limits: {
    fileSize: multerConfig.fileSize,
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
      return cb(
        new HttpException(
          'Only image files are allowed!',
          HttpStatus.BAD_REQUEST,
        ),
        false,
      )
    }
    cb(null, true)
  },
  // TODO: Change so image is saved into storage first. Then optimized and replaced with new image.
  storage: memoryStorage(),
}

export enum SupportedFiles {
  JPG = 'jpg',
  JPEG = 'jpeg',
  PNG = 'png',
  GIF = 'gif',
  WEBP = 'webp',
}

export type SupportedFilesType = `${SupportedFiles}`

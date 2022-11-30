import { HttpException, HttpStatus } from '@nestjs/common'
import { MulterModuleOptions } from '@nestjs/platform-express'
import { memoryStorage } from 'multer'

export const multerConfig = {
  dest: process.env.UPLOADS_PATH,
  fileSize: +process.env.MAX_FILE_UPLOAD_SIZE,
}

export const multerImageOptions: MulterModuleOptions = {
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

    if (file.size > multerConfig.fileSize) {
      return cb(
        new HttpException(
          `File size must be less than ${multerConfig.fileSize} bytes`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      )
    }

    cb(null, true)
  },
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

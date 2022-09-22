import { diskStorage, memoryStorage } from 'multer'
import { v4 as uuidv4 } from 'uuid'
import { extname, join, parse } from 'path'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { HttpException, HttpStatus } from '@nestjs/common'

export const multerConfig = {
  dest: process.env.UPLOADS_PATH,
}

interface MulterImageOptions {
  folder?: string
}

/**
 * If you want to use diskStorage instead of sharp image processing, Include the uploadFileExt String
 *
 * @param uploadFileExt String of the file extension
 */
export const multerImageOptions = (
  options?: MulterImageOptions | undefined,
): MulterOptions => ({
  limits: {
    fileSize: +process.env.MAX_FILE_UPLOAD_SIZE,
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
  storage: options?.folder
    ? diskStorage({
        destination: join(multerConfig.dest, options.folder),
        filename: (req, file, cb) => {
          cb(null, `${generateFileName(file)}${extname(file.originalname)}`)
        },
      })
    : memoryStorage(),
})

export type SupportedFileType = 'jpg' | 'jpeg' | 'png' | 'gif' | 'webp'

/**
 *
 * If you don't include an extension the filename will not have an extension
 *
 * @param file Express.Multer.File
 * @param extension SupportedFileType
 * @returns FileName
 */
export const generateFileName = (
  file: Express.Multer.File,
  extension?: SupportedFileType,
) =>
  parse(file.originalname).name.replace(/[^a-z0-9]/gi, '_') +
  uuidv4() +
  (extension ? `.${extension}` : '')

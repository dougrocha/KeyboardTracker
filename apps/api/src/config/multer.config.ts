import { diskStorage } from 'multer'
import { v4 as uuidv4 } from 'uuid'
import { extname, join, parse } from 'path'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import { HttpException, HttpStatus } from '@nestjs/common'

export const multerConfig = {
  dest: process.env.UPLOADS_PATH,
}

export const multerOptions = (uploadFileExt?: string): MulterOptions => ({
  limits: {
    fileSize: +process.env.MAX_FILE_UPLOAD_SIZE,
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
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
  storage: diskStorage({
    destination: join(multerConfig.dest, uploadFileExt),
    filename: (req, file, cb) => {
      cb(null, `${generateFileName(file)}${extname(file.originalname)}`)
    },
  }),
})

// This will check the added and make sure there is a / before for it to work
const checkPath = (path?: string) => {
  if (!path) return ''
  return path[0] !== '/' ? '/' + path : path
}

const generateFileName = (file: Express.Multer.File) =>
  parse(file.originalname).name.replace(/[^a-z0-9]/gi, '_') + uuidv4()

import { NotFoundException } from '@nestjs/common'

export class ImageNotFoundException extends NotFoundException {
  constructor() {
    super(`Image was not found. File contains errors.`)
  }
}

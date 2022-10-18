import { Prisma } from '@prisma/client'

export class CreateKeycapsDto implements Prisma.KeycapSetCreateInput {
  profile?: string
  material?: string
  createdAt?: string | Date
  updatedAt?: string | Date
  product: Prisma.ProductCreateNestedOneWithoutKeycapSetInput
}

import { GroupBuyStatus, Prisma, ProductType } from '@prisma/client'

export class CreateKeycapsDto implements Prisma.KeycapSetCreateInput {
  id: string
  name: string
  description?: string
  type?: ProductType
  brand?: string
  profile?: string
  material?: string
  imageCovers?: Prisma.CoverImageCreateNestedManyWithoutKeycapSetInput
  images?: Prisma.ImageCreateNestedManyWithoutKeycapSetInput
  interestCheckUrl?: string
  groupBuyUrl?: string
  groupBuyStartDate?: string | Date
  groupBuyEndDate?: string | Date
  status?: GroupBuyStatus
  delayed?: boolean
  createdAt?: string | Date
  updatedAt?: string | Date
  keycapSetVendor?: Prisma.KeycapSetVendorCreateNestedManyWithoutKeycapSetInput
  designer?: Prisma.DesignerCreateNestedOneWithoutKeycapSetInput
}

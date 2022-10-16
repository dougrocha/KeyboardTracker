import { GroupBuyStatus, Prisma } from '@prisma/client'

export class CreateKeycapsDto implements Prisma.KeycapSetCreateInput {
  id: string
  name: string
  description?: string
  type?: string
  brand?: string
  imageCoverUrl?: string
  slug: string
  material?: string
  imageUrls?: Prisma.Enumerable<string> | Prisma.KeycapSetCreateimageUrlsInput
  interestCheckUrl?: string
  groupBuyUrl?: string
  groupBuyStartDate?: string | Date
  groupBuyEndDate?: string | Date
  status: GroupBuyStatus
  delayed?: boolean
  createdAt?: string | Date
  updatedAt?: string | Date
  keycapSetVendor?: Prisma.KeycapSetVendorCreateNestedManyWithoutKeycapSetInput
  keycapKitImages?: Prisma.KeycapKitImageCreateNestedManyWithoutKeycapSetInput
  designer?: Prisma.DesignerCreateNestedOneWithoutKeycapSetInput
}

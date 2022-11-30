import { Prisma } from "@prisma/client"

const productWithImages = Prisma.validator<Prisma.ProductArgs>()({
  include: {
    images: true,
  },
})

export type ProductWithImages = Prisma.ProductGetPayload<
  typeof productWithImages
>

const productIncludeAll = Prisma.validator<Prisma.ProductArgs>()({
  include: {
    images: true,
    keycapSet: true,
    keyboard: true,
    designers: true,
    vendors: true,
  },
})

export type ProductIncludeAll = Prisma.ProductGetPayload<
  typeof productIncludeAll
>

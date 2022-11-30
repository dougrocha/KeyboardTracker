import { Prisma } from "@prisma/client"

const productVendorWithVendors = Prisma.validator<Prisma.ProductVendorArgs>()({
  include: {
    vendor: true,
  },
})

export type ProductVendorWithVendors = Prisma.ProductVendorGetPayload<
  typeof productVendorWithVendors
>

const productVendorWithProducts = Prisma.validator<Prisma.ProductVendorArgs>()({
  include: {
    product: true,
  },
})

export type ProductVendorWithProducts = Prisma.ProductVendorGetPayload<
  typeof productVendorWithProducts
>

const productVendorWithProductsAndVendors =
  Prisma.validator<Prisma.ProductVendorArgs>()({
    include: {
      product: true,
      vendor: true,
    },
  })

export type ProductVendorWithProductsAndVendors =
  Prisma.ProductVendorGetPayload<typeof productVendorWithProductsAndVendors>

import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid"
import { HeartIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import React from "react"
import MainViewLayout from "../../layouts/MainViewLayout"
import { GetStaticPropsContext, GetStaticPropsResult } from "next"
import { GetAllProductIds } from "../../libs/api/GetAllProducts"
import {
  FindOneProduct,
  FindProductVendors,
} from "../../libs/api/FindOneProduct"
import { Image as ProductImage, Product } from "../../types/product"
import { Vendor } from "../../types/image"
import Link from "next/link"
import { StatusString } from "../../utils/statusStrings"

interface ProductPageProps {
  product: Product
  vendors: Vendor[]
}

/**
 * TODO: Add ability to change images of big slides
 * TODO: Possibly make crumbs list above title
 * TODO: Implement Information on backend
 *
 */

const ProductPage = ({ product, vendors }: ProductPageProps) => {
  const { name, status: productStatus, images, coverImage } = product

  const status = StatusString(productStatus)

  return (
    <MainViewLayout>
      <div className="mb-20 flex items-center justify-between space-x-10">
        <div className="flex flex-col items-start space-y-2">
          <h1 className="text-5xl font-semibold">{name}</h1>
          <span className="max-h-min rounded bg-yellow-600 px-2 py-1 text-center text-sm uppercase">
            {status}
          </span>
        </div>
        <SolidHeartIcon className="icon ml-auto text-red-600" />
      </div>
      <section className="flex h-full flex-col space-y-10 lg:flex-row lg:justify-between lg:space-y-0 lg:space-x-40">
        <ProductImage
          size="lg"
          image={{
            imgUrl: "/hero.jpg",
            title: name,
            description: product.description,
          }}
        />

        <div className="flex flex-col justify-between md:flex-row md:items-end lg:flex-col">
          <div className="flex space-x-28 px-4 md:justify-center md:px-0 lg:space-x-32">
            <InfoColumn>
              <InfoTag
                title="Start Date"
                value={
                  product.groupBuyStartDate
                    ? new Date(product.groupBuyStartDate).toLocaleDateString()
                    : undefined
                }
              />
              <InfoTag title="Brand" value={product.brand} />
              <InfoTag title="Status" value={status} />
            </InfoColumn>
            <InfoColumn>
              <InfoTag
                title="End Date"
                value={
                  product.groupBuyEndDate
                    ? new Date(product.groupBuyEndDate).toLocaleDateString()
                    : undefined
                }
              />
              <InfoTag title="Profile" value={product.keycapSet?.profile} />
              <InfoTag title="Material" value={product.keycapSet?.material} />
            </InfoColumn>
          </div>
          <button className="mt-10 rounded bg-blue-700 px-4 py-2 text-white md:mt-0">
            Interest Check
          </button>
        </div>
      </section>

      {vendors ? (
        <section className="mt-24">
          <h3 className="text-3xl font-semibold">Vendors</h3>
          <div
            className={`mt-10 flex space-x-4 ${
              vendors.length > 3 ? "justify-start" : "justify-center"
            }`}
          >
            {vendors.map((vendor) => (
              <VendorButton vendor={vendor} />
            ))}
          </div>
        </section>
      ) : null}

      {product.images ? (
        <section className="mt-24 mb-20">
          <h3 className="text-3xl font-semibold">Kits</h3>
          <div className="mt-10 grid grid-cols-3 space-x-4">
            {product.images.map((image) => (
              <ProductImage key={image.id} image={image} />
            ))}
          </div>
        </section>
      ) : null}
    </MainViewLayout>
  )
}

const VendorButton = ({ vendor }: { vendor: Vendor }) => {
  return (
    <Link
      href={`/vendors/${vendor.name.toLowerCase()}`}
      className="w-56 rounded bg-gray-400 px-2 py-4 text-center text-white"
    >
      {vendor.name}
    </Link>
  )
}

const ProductImage = ({
  image,
  size = "lg",
}: {
  image?: Partial<ProductImage>
  size?: "sm" | "lg"
}) => {
  return (
    <div
      key={image?.id}
      className={`relative w-full lg:w-1/2 ${size == "sm" ? "h-52" : "h-96"}
  }`}
    >
      <Image
        src={"/hero.jpg"}
        alt={`${image?.title}`}
        fill
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        priority
        className="absolute rounded-lg object-cover object-center"
      />
      <p className="mt-2 font-medium">{image?.title}</p>
    </div>
  )
}

const InfoColumn = ({
  center,
  children,
}: {
  center?: boolean
  children: React.ReactNode
}) => {
  return (
    <div className="flex flex-col space-y-5">
      {React.Children.map(children, (child) => {
        return (
          <li
            className={`flex space-x-2 ${
              center ? "items-center" : "items-start"
            }`}
          >
            {child}
          </li>
        )
      })}
    </div>
  )
}

const InfoTag = ({ title, value }: { title: string; value?: string }) => {
  return (
    <div className="flex flex-col">
      <span className="font-semibold">{title}</span>
      <span>{value ? value : "N/A"}</span>
    </div>
  )
}

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<ProductPageProps>> => {
  const product = await FindOneProduct(params?.id as string)
  const productVendors = await FindProductVendors(params?.id as string)

  const vendors = productVendors.map((vendor) => vendor.vendor)

  return {
    props: {
      product,
      vendors,
    },
  }
}

export const getStaticPaths = async () => {
  const data = await GetAllProductIds({})

  const paths = data.map(({ id }) => ({
    params: { id },
  }))

  return {
    paths,
    fallback: false,
  }
}

export default ProductPage

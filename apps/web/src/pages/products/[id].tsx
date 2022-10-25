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
import { Product } from "../../types/product"
import { Vendor } from "../../types/image"
import Link from "next/link"

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
  return (
    <MainViewLayout>
      <div className="mb-20 flex items-center gap-x-10">
        <h1 className="text-4xl font-semibold">{product.name}</h1>
        <div className="rounded bg-yellow-600 px-2 py-1 text-sm uppercase">
          {product.status}
        </div>
        <SolidHeartIcon className="icon ml-auto text-red-600" />
      </div>
      <section className="flex justify-between gap-x-40">
        <div className="relative h-96 w-1/2">
          <Image
            src="/hero.jpg"
            alt={`${product.name}`}
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            className="absolute rounded-lg object-cover object-center"
          />
        </div>
        <div className="flex flex-col items-end justify-between">
          <div className="flex gap-x-40 pt-5">
            <ul className="flex flex-col justify-between gap-y-5">
              <li>
                <p className="font-semibold">Start Date</p>
                {product.groupBuyStartDate
                  ? new Date(product.groupBuyStartDate).toLocaleDateString()
                  : null}
              </li>
              <li>
                <p className="font-semibold">Brand</p>
                {product.brand}
              </li>
              <li>
                <p className="font-semibold">Status</p>
                {product.status}
              </li>
            </ul>
            <ul className="flex flex-col justify-between gap-y-5">
              <li>
                <p className="font-semibold">End Date</p>
                {product.groupBuyEndDate
                  ? new Date(product.groupBuyEndDate).toLocaleDateString()
                  : null}
              </li>
              <li>
                <p className="font-semibold">Profile</p>
                {product.keycapSet?.profile}
              </li>
              <li>
                <p className="font-semibold">Material</p>
                {product.keycapSet?.material}
              </li>
            </ul>
          </div>
          <button className="rounded bg-blue-700 px-4 py-2 text-white">
            Interest Check
          </button>
        </div>
      </section>
      <section className="mt-24">
        <h3 className="text-3xl font-semibold">Vendors</h3>
        <div
          className={`mt-10 flex gap-x-4 ${
            vendors ? "justify-start" : "justify-center"
          }`}
        >
          {vendors ? (
            <>
              {vendors.map((vendor) => (
                <Link
                  key={vendor.name}
                  href={`/vendors/${vendor.name.toLowerCase()}`}
                >
                  <a className="w-56 rounded bg-gray-400 px-2 py-4 text-center text-white">
                    {vendor.name}
                  </a>
                </Link>
              ))}
            </>
          ) : (
            <span>NO VENDORS</span>
          )}
        </div>
      </section>
      <section className="mt-24 mb-20">
        <h3 className="text-3xl font-semibold">Kits</h3>
        <div className="mt-10 grid grid-cols-3 gap-x-4">
          <div className="mb-6 flex flex-col">
            <div className="relative h-52 w-full">
              <Image
                src="/hero.jpg"
                alt="kit picture"
                fill
                sizes="100vw"
                className="absolute rounded-lg object-cover object-center"
              />
            </div>
            <p className="mt-2 font-medium">Kit Name</p>
          </div>
          <div className="mb-6 flex flex-col">
            <div className="relative h-52 w-full">
              <Image
                src="/hero.jpg"
                alt="kit picture"
                fill
                sizes="100vw"
                className="absolute rounded-lg object-cover object-center"
              />
            </div>
            <p className="mt-2 font-medium">Kit Name</p>
          </div>
          <div className="mb-6 flex flex-col">
            <div className="relative h-52 w-full">
              <Image
                src="/hero.jpg"
                alt={`${product.name}`}
                fill
                sizes="100vw"
                className="absolute rounded-lg object-cover object-center"
              />
            </div>
            <p className="mt-2 font-medium">Kit Name</p>
          </div>
          <div className="mb-6 flex flex-col">
            <div className="relative h-52 w-full">
              <Image
                src="/hero.jpg"
                alt="kit picture"
                fill
                sizes="100vw"
                className="absolute rounded-lg object-cover object-center"
              />
            </div>
            <p className="mt-2 font-medium">Kit Name</p>
          </div>
          <div className="mb-6 flex flex-col">
            <div className="relative h-52 w-full">
              <Image
                src="/hero.jpg"
                alt="kit picture"
                fill
                sizes="100vw"
                className="absolute rounded-lg object-cover object-center"
              />
            </div>
            <p className="mt-2 font-medium">Kit Name</p>
          </div>
        </div>
      </section>
    </MainViewLayout>
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

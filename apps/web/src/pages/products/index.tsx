import { GetStaticPropsResult } from "next"
import Link from "next/link"
import React from "react"
import Card from "../../components/Card"
import MainViewLayout from "../../layouts/MainViewLayout"
import { GetAllProducts } from "../../libs/api/GetAllProducts"
import { Product } from "../../types/product"

interface CatalogProps {
  products: Product[]
}

const CatalogPage = ({ products }: CatalogProps) => {
  return (
    <MainViewLayout>
      {/* Search bar area */}
      <div></div>
      {/* Items area */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <Card key={p.id} product={p} />
          // <div
          //   key={product.id}
          //   className="relative flex flex-col gap-5 rounded-lg border border-gray-200 p-5"
          // >
          //   <div className="flex items-center gap-5">
          //     <div className="relative h-40 w-40">
          //       <img
          //         src={product.coverImage ?? "/hero.jpg"}
          //         alt={`${product.name}`}
          //         className="absolute rounded-lg object-cover object-center"
          //       />
          //     </div>
          //     <div className="flex flex-col gap-2">
          //       <p className="text-2xl font-medium">{product.name}</p>
          //       <p className="text-gray-500">{product.description}</p>
          //     </div>
          //   </div>
          //   <div className="flex flex-col gap-2">
          //     <p className="text-2xl font-medium">Price</p>
          //     <p className="text-gray-500">{product.price}</p>
          //   </div>
          //   <Link href={`/products/${product.id}`}>
          //     <a className="after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0">
          //       Read more.
          //     </a>
          //   </Link>
          // </div>
        ))}
      </div>
    </MainViewLayout>
  )
}

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<CatalogProps>
> => {
  const products = await GetAllProducts({})

  return {
    props: { products },
    revalidate: 60,
  }
}

export default CatalogPage

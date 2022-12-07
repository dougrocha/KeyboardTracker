import { Product } from "@meka/database"
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import React from "react"

import ProductCard from "../../components/ProductCard"
import SearchBox from "../../components/SearchBox"
import MainViewLayout from "../../layouts/MainViewLayout"
import { GetAllProducts } from "../../libs/api/GetAllProducts"
import { SearchProducts } from "../../libs/api/SearchProducts"

interface CatalogPageProps {
  products: Product[]
  count: number
}

const CatalogPage = ({ products }: CatalogPageProps) => {
  return (
    <MainViewLayout>
      {/* Search bar area */}
      <div className="my-10 flex w-full items-center justify-center">
        <SearchBox placeholder="Search a product..." maxWidth="lg" />
      </div>
      {/* Items area */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} width="full" />
        ))}
      </div>
    </MainViewLayout>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<CatalogPageProps>> => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=1, stale-while-revalidate=59"
  )

  const queries = context.query

  const pagination = {
    page: 1,
    perPage: 15,
  }

  if (Object.keys(queries).length === 0) {
    const products = await GetAllProducts(pagination)

    return {
      props: { products: products.data, count: products.count },
    }
  }

  const products = await SearchProducts(
    queries.search as string,
    pagination,
    queries
  )

  return {
    props: { products: products.data, count: products.count },
  }
}

export default CatalogPage

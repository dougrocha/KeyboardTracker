import { GetStaticPropsResult } from "next"
import React from "react"

import Card from "../../components/Card"
import SearchBox from "../../components/SearchBox"
import MainViewLayout from "../../layouts/MainViewLayout"
import { GetAllProducts } from "../../libs/api/GetAllProducts"
import { Product } from "../../types/product"

interface CatalogPageProps {
  products: Product[]
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
          <Card key={p.id} product={p} />
        ))}
      </div>
    </MainViewLayout>
  )
}

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<CatalogPageProps>
> => {
  const products = await GetAllProducts({})


  return {
    props: { products },
    revalidate: 60,
  }
}

export default CatalogPage

import { GroupBuyStatus, Product } from "@meka/database"
import { PaginatedResults } from "@meka/types"
import { GetStaticPropsResult } from "next"
import Link from "next/link"
import React, { ReactElement } from "react"

import Carousel from "../components/Carousel"
import Hero from "../components/Hero"
import ProductCard from "../components/ProductCard"
import SearchBox from "../components/SearchBox"
import MainViewLayout from "../layouts/MainViewLayout"
import { GetAllProducts } from "../libs/api/GetAllProducts"
import GetProductsByStatus from "../libs/api/GetProductsByStatus"

interface HomePageProps {
  interestChecks?: PaginatedResults<Product>
  groupBuys?: PaginatedResults<Product>
  mostRecentProducts?: PaginatedResults<Product>
}

const HomePage = ({
  groupBuys,
  interestChecks,
  mostRecentProducts,
}: HomePageProps) => {
  return (
    <>
      <Hero />

      <div className="container mx-auto mb-10 flex w-full flex-col items-center justify-center gap-y-4">
        <div className="flex flex-col items-center justify-center">
          <h4 className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Search
          </h4>
          <p className="mt-2 text-base text-gray-700 dark:text-gray-400">
            Search for products, groups, and more
          </p>
        </div>

        <SearchBox maxWidth="xl" />
      </div>

      <div className="mt-20 mb-10 flex flex-col space-y-10">
        <Carousel title="Interest Checks">
          {interestChecks?.data?.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Carousel>
        <Carousel title="Group Buys">
          {groupBuys?.data?.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Carousel>

        <div className="flex flex-col items-center">
          <p className="mt-10 mb-8 text-2xl font-semibold">Live Group Buys</p>
          <div className="grid w-full grid-cols-1 place-items-center gap-y-6 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {mostRecentProducts?.data?.map((p) => (
              <ProductCard key={p.id} product={p} width="full" />
            ))}
          </div>

          <Link href={"/products"} passHref>
            <button className="mt-10 rounded-md bg-gray-200 py-2 px-4 font-medium text-black">
              Find More
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

HomePage.getLayout = (page: ReactElement) => (
  <MainViewLayout>{page}</MainViewLayout>
)

export async function getStaticProps(): Promise<
  GetStaticPropsResult<HomePageProps>
> {
  const interestChecks = await GetProductsByStatus(
    GroupBuyStatus.INTEREST_CHECK
  )
  const groupBuys = await GetProductsByStatus(GroupBuyStatus.GROUP_BUY)
  const mostRecentProducts = await GetAllProducts({ perPage: 9 })

  return {
    props: {
      interestChecks,
      groupBuys,
      mostRecentProducts,
    },
  }
}

export default HomePage

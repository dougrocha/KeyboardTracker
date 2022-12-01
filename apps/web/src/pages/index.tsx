import { GroupBuyStatus, Product } from "@meka/database"
import { PaginatedResults } from "@meka/types"
import { GetStaticPropsResult } from "next"
import Link from "next/link"
import { ReactElement } from "react"

import Card from "../components/Card"
import Carousel from "../components/Carousel"
import Hero from "../components/Hero"
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

      <div className="mt-20 mb-10 flex flex-col space-y-10">
        <Carousel title="Interest Checks">
          {interestChecks?.data?.map((p) => (
            <Card key={p.id} product={p} className="w-80 rounded" />
          ))}
        </Carousel>
        <Carousel title="Group Buys">
          {groupBuys?.data?.map((p) => (
            <Card key={p.id} product={p} className="w-80 rounded" />
          ))}
        </Carousel>

        <div className="flex flex-col items-center">
          <p className="mb-8 mt-10 text-2xl font-semibold">Live Group Buys</p>
          <div className="grid w-full grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3">
            {mostRecentProducts?.data?.map((p) => (
              <Card
                key={p.id}
                product={p}
                className="w-full rounded sm:w-72 md:w-80 xl:w-96"
              />
            ))}
          </div>

          <Link href={"/products"}>
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

export default HomePage

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

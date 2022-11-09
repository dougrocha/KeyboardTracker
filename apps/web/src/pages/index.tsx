import { GetStaticPropsResult } from "next"
import Link from "next/link"
import { ReactElement } from "react"

import Card from "../components/Card"
import Carousel from "../components/Carousel"
import Hero from "../components/Hero"
import MainViewLayout from "../layouts/MainViewLayout"
import { GetAllProducts } from "../libs/api/GetAllProducts"
import GetProductsByStatus from "../libs/api/GetProductsByStatus"
import { GroupBuyStatus } from "../types/groupBuyStatus"
import { Product } from "../types/product"

interface HomePageProps {
  interestChecks?: Product[]
  groupBuys?: Product[]
  mostRecentProducts?: Product[]
}

const HomePage = ({
  groupBuys,
  interestChecks,
  mostRecentProducts,
}: HomePageProps) => {
  return (
    <>
      <Hero />

      <div className="mt-20 mb-10 flex flex-col space-y-10 overflow-x-scroll">
        <Carousel title="Interest Checks">
          {interestChecks?.map((p) => (
            <Card key={p.id} product={p} className="w-80 rounded" />
          ))}
        </Carousel>
        <Carousel title="Group Buys">
          {groupBuys?.map((p) => (
            <Card key={p.id} product={p} className="w-80 rounded" />
          ))}
        </Carousel>

        <div className="flex flex-col items-center">
          <p className="mb-8 mt-10 text-2xl font-semibold">Live Group Buys</p>
          <div className="grid w-full grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3">
            {mostRecentProducts?.map((p) => (
              <Card
                key={p.id}
                product={p}
                className="w-full rounded sm:w-72 md:w-80 xl:w-96"
              />
            ))}
          </div>
          <Link href={"/products"} legacyBehavior>
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
  <MainViewLayout footer>{page}</MainViewLayout>
)

export default HomePage

export async function getStaticProps(): Promise<
  GetStaticPropsResult<HomePageProps>
> {
  const interestChecks = await GetProductsByStatus(
    GroupBuyStatus.INTEREST_CHECK
  )
  const groupBuys = await GetProductsByStatus(GroupBuyStatus.GROUP_BUY)
  const mostRecentProducts = await GetAllProducts({ take: 15 })

  return {
    props: {
      interestChecks,
      groupBuys,
      mostRecentProducts,
    },
  }
}

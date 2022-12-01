import { HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid"
import { GroupBuyStatus, Product } from "@meka/database"
import { PaginatedResults } from "@meka/types"
import classNames from "classnames"
import { format } from "date-fns"
import { GetStaticPropsResult } from "next"
import Image from "next/image"
import Link from "next/link"
import { ReactElement, useState } from "react"

import Card from "../components/Card"
import Carousel from "../components/Carousel"
import Hero from "../components/Hero"
import SearchBox from "../components/SearchBox"
import MainViewLayout from "../layouts/MainViewLayout"
import { UseFavorites } from "../libs/api/Favorites"
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

      <div className="container mx-auto mb-10 flex w-full flex-col items-center justify-center space-y-4">
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
          <p className="mb-8 mt-10 text-2xl font-semibold">Live Group Buys</p>
          <div className="grid w-full grid-cols-1 place-items-center gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {mostRecentProducts?.data?.map((p) => (
              <ProductCard key={p.id} product={p} width="full" />
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

const ProductCard = ({
  product,
  width,
}: {
  product: Product
  width?: "sm" | "md" | "lg" | "full"
}): ReactElement => {
  const {
    favorites: { data: favorites },
    addFavorite,
    removeFavorite,
  } = UseFavorites({
    onError: (err) => {
      setIsFavorite(favoriteProduct ? true : false)
      console.error(err)
    },
  })

  const [isFavorite, setIsFavorite] = useState(false)

  const favoriteProduct = favorites?.find(
    (fav) => fav.product.id === product.id
  )

  const changeOnFavorite = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()

    isFavorite && favoriteProduct
      ? (removeFavorite.mutate(favoriteProduct.id), setIsFavorite(false))
      : (addFavorite.mutate(product.id), setIsFavorite(true))
  }

  return (
    <Link
      href={`/products/${product.id}`}
      className={classNames(
        "relative mb-4 box-border flex h-full shrink-0 flex-col items-center justify-center",
        width ? `w-${width}` : "w-96"
      )}
    >
      <>
        <div className="relative h-36 w-full select-none">
          <Image
            src={product.coverImage ?? "/images/hero.jpg"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 320px"
            className="rounded-t-md object-cover"
          />
        </div>

        <button
          className="absolute top-2 right-2 z-10 rounded-full bg-white p-2 dark:bg-gray-800"
          onClick={(e) => {
            changeOnFavorite(e)
          }}
        >
          {favoriteProduct ? (
            <SolidHeartIcon className="right-6 bottom-1/4 h-5 w-5 text-red-500 dark:text-white" />
          ) : (
            <HeartIcon className="right-6 bottom-1/4 h-5 w-5 text-black dark:text-white" />
          )}
        </button>

        {/* This is trick is so the link can extend to the parent object */}
        <Link
          href={`products/${product.id}`}
          className="after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0"
        />

        <div className="flex h-24 w-full justify-between rounded-b-md bg-indigo-50 p-4 dark:bg-gray-800">
          <div className="flex flex-col justify-between">
            <p className="text-lg font-semibold">{product.name}</p>
            <p className="max-w-min rounded bg-indigo-400 px-2 py-1 text-xs font-medium text-white ">
              {product.status}
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <div></div>
            <p className="text-sm">
              {product.groupBuyStartDate && product.groupBuyEndDate ? (
                <>
                  {format(new Date(product.groupBuyStartDate), "MMM dd, yyyy")}{" "}
                  - {format(new Date(product.groupBuyEndDate), "MMM dd, yyyy")}
                </>
              ) : (
                <>{product.estimatedDeliveryYear}</>
              )}
            </p>
          </div>
        </div>
      </>
    </Link>
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

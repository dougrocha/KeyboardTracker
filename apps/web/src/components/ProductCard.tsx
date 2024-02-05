import { HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid"
import { Product } from "@meka/database"
import classNames from "classnames"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import React, { ReactElement, useState } from "react"

import { useFavorites } from "../libs/api/Favorites"

interface ProductCardProps {
  product: Product
  width?: "sm" | "md" | "lg" | "full"
  favorite?: boolean
}

const ProductCard = ({
  product,
  width,
  favorite,
}: ProductCardProps): ReactElement => {
  const { favorites, addFavorite, removeFavorite } = useFavorites({
    onSettled: (data) => {
      setIsFavorite(
        data?.find((f) => f.productId === product.id) ? true : false
      )
    },
    onError: (err) => {
      setIsFavorite(false)
                        console.error(err)
    },
    enabled: favorite == undefined ? true : false,
  })

  const [isFavorite, setIsFavorite] = useState(false)

  const changeOnFavorite = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()

    const favorite = favorites.data?.find((f) => f.productId === product.id)

    isFavorite && favorite
      ? (removeFavorite.mutate(favorite.id), setIsFavorite(false))
      : (addFavorite.mutate(product.id), setIsFavorite(true))
  }

  return (
    <Link
      href={`/products/${product.id}`}
      className={classNames(
        "relative flex h-full shrink-0 flex-col items-center justify-center overflow-hidden rounded shadow",
        width ? `w-${width}` : "w-96"
      )}
    >
      <>
        <div className="relative w-full h-36 select-none">
          <Image
            src={
              product.coverImage
                ? `${process.env.NEXT_PUBLIC_API_URL}/product/${product.id}/image/${product.coverImage}`
                : "/images/hero.jpg"
            }
            alt={product.name}
            fill
            sizes="
            (max-width: 640px) 100vw,
            (max-width: 768px) 50vw,
            (max-width: 1024px) 33.3vw,
            512px"
            className="object-cover"
          />
        </div>

        <button
          className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full dark:bg-gray-800"
          onClick={(e) => {
            changeOnFavorite(e)
          }}
        >
          {isFavorite ? (
            <SolidHeartIcon className="w-5 h-5 text-red-500" />
          ) : (
            <HeartIcon className="w-5 h-5 text-black dark:text-white" />
          )}
        </button>

        <div className="flex justify-between p-2 w-full h-24 bg-indigo-50 dark:bg-gray-700">
          <div className="flex flex-col justify-between">
            <p className="text-lg font-semibold">{product.name}</p>
            <p className="py-1 px-2 max-w-min text-xs font-medium text-white bg-indigo-500 rounded">
              {product.status}
            </p>
          </div>
          <div className="flex flex-col justify-end">
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
export default ProductCard

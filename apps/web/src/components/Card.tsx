import { HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"

import { UseFavorites } from "../libs/api/AddProductToFavorites"
import { GetProfileInformation } from "../libs/api/GetMe"
import { GetUserFavorites } from "../libs/api/GetUserFavorites"
import { Product } from "../types/product"

interface CardProps {
  product: Product
  className?: string
}

const Card = ({ product, className }: CardProps) => {
  const { data: user } = useQuery(["user"], GetProfileInformation)

  const { data } = useQuery(["favorites"], GetUserFavorites, {
    enabled: !!user?.id,
  })

  const favoriteProduct = data?.favorites?.find(
    (fav) => fav.product.id === product.id
  )

  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    setIsFavorite(favoriteProduct?.product ? true : false)
  }, [favoriteProduct])

  const { id, name, coverImage } = product

  const { addFavorite, removeFavorite } = UseFavorites({
    onError: (err) => {
      setIsFavorite(favoriteProduct ? true : false)
      console.error(err)
    },
  })

  const changeOnFavorite = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()

    isFavorite && favoriteProduct
      ? (removeFavorite.mutate(favoriteProduct.id), setIsFavorite(false))
      : (addFavorite.mutate(product.id), setIsFavorite(true))
  }

  return (
    <li
      className={`relative mb-4 box-border inline-flex h-72 shrink-0 select-text flex-col items-center justify-between overflow-hidden ${className}`}
    >
      <div className="relative h-full w-full select-none">
        <Image
          src={coverImage ?? "/hero.jpg"}
          alt={`card image for ${name}`}
          fill
          sizes="(max-width: 640px) 320px"
          className="h-full object-cover object-center"
        />
      </div>

      {/* This is trick is so the link can extend to the parent object */}
      <Link
        href={`products/${id}`}
        className="after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0"
      />

      <div className="bottom-0 flex h-24 w-full justify-between py-2">
        <div className="flex flex-col justify-between">
          <p className="font-bold">{name}</p>
          <p className="text-sm">Date</p>
        </div>
        <div className="flex flex-col items-end justify-between">
          <div className="rounded bg-orange-600 px-1 py-1 text-xs">
            SHIPPING
          </div>
          {/* Setting this button to relative brings it up and above the a tag. 
          Allows you to click this without having to mess with useRef  */}
          <button
            className="relative"
            onClick={(e) => {
              changeOnFavorite(e)
            }}
          >
            {isFavorite ? (
              <SolidHeartIcon className="right-6 bottom-1/4 h-5 w-5 text-red-500 dark:text-white" />
            ) : (
              <HeartIcon className="right-6 bottom-1/4 h-5 w-5 text-black dark:text-white" />
            )}
          </button>
        </div>
      </div>
    </li>
  )
}

export default Card

import { HeartIcon } from "@heroicons/react/24/outline"
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { Product } from "../types/product"

interface CardProps {
  product: Product
  className?: string
}

/**
 * Card Component
 * @property @interface CardProps
 */
const Card = ({ product, className }: CardProps) => {
  const { id, name, description, type, status, brand, coverImage } = product

  const [favorite, setFavorite] = useState(false)

  const addCurrentToFavorite = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setFavorite(!favorite)
    console.log(`Added to favorites: ${id}-${name}`)
  }

  return (
    <li
      className={`relative mb-4 box-border inline-flex h-72 shrink-0 flex-col items-center justify-between overflow-hidden ${className}`}
    >
      <div className="relative h-full w-full">
        <Image
          src={coverImage ?? "/hero.jpg"}
          alt={`card image for ${name}`}
          fill
          sizes="100vw"
          className="h-full object-cover object-center"
        />
        {/* This is trick is so the link can extend to the parent object */}
      </div>

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
              addCurrentToFavorite(e)
            }}
          >
            {favorite ? (
              <SolidHeartIcon className="right-6 bottom-1/4 h-5 w-5 text-black dark:text-white" />
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

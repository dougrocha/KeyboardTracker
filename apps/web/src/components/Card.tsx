import { HeartIcon } from "@heroicons/react/24/outline"
import Image from "next/future/image"
import { useRouter } from "next/router"
import React from "react"

interface CardProps {
  title: string
  /**
   * Default Width: 100
   */
  className?: string
  image: string
  alt: string
  key?: string | number
}

/**
 * Card Component
 * @property @interface CardProps
 */
const Card = ({ title, image, className, alt }: CardProps) => {
  const addCurrentToFavorite = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    console.log(`Added to favorites: ${title}`)
  }

  const { push } = useRouter()

  return (
    <section
      key={title}
      className={`mb-4 box-border inline-flex h-72 shrink-0 flex-col items-center justify-between overflow-hidden ${className}`}
      onClick={() => {
        push(`items/${title}`)
      }}
    >
      <div className="relative h-full w-full">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="100vw"
          className="h-full object-cover object-center"
        />
      </div>

      <div className="bottom-0 flex h-24 w-full justify-between py-2">
        <div className="flex flex-col justify-between">
          <p className="font-bold">{title}</p>
          <p className="text-sm">Date</p>
        </div>
        <div className="flex flex-col items-end justify-between">
          <div className="rounded bg-orange-600 px-1 py-1 text-xs">
            SHIPPING
          </div>
          <button
            onClick={(e) => {
              addCurrentToFavorite(e)
            }}
          >
            <HeartIcon className="right-6 bottom-1/4 h-5 w-5 text-black dark:text-white" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Card

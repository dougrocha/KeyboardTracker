import { XMarkIcon } from "@heroicons/react/20/solid"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import ProfileHeader from "../../components/Profile/ProfileHeader"
import ProfileLayout from "../../layouts/ProfileLayout"
import { useFavorites } from "../../libs/api/Favorites"

const FavoritesPage = () => {
  return (
    <>
      <ProfileHeader title="Favorites" />

      <FavoritesContainer />
    </>
  )
}

const FavoritesContainer = () => {
  const { favorites, removeFavorite } = useFavorites()

  if (favorites.isLoading) {
    return <div>Loading...</div>
  }

  const favoritesData = favorites.data

  if (!favoritesData?.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">No Favorites</h1>
        <p className="text-gray-500">You have no favorites yet.</p>
      </div>
    )
  }

  return (
    <>
      {favoritesData.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {favoritesData.map((favorite) => (
              <Link key={favorite.id} href={`/products/${favorite.product.id}`}>
                <div className="relative flex flex-col overflow-hidden rounded-md bg-white shadow">
                  <XMarkIcon
                    className="absolute right-4 bottom-4 h-6 w-6 rounded-md transition-colors duration-100 hover:bg-gray-200"
                    onClick={(e) => {
                      e.preventDefault()
                      removeFavorite.mutate(favorite.id)
                    }}
                  />

                  <div className="flex items-center justify-between">
                    <div className="relative h-24 w-full">
                      <Image
                        src={
                          favorite.product.coverImage
                            ? `${process.env.NEXT_PUBLIC_API_URL}/product/${favorite.product.id}/image/${favorite.product.coverImage}`
                            : "/images/hero.jpg"
                        }
                        fill
                        sizes="
                          (max-width: 640px) 100vw,
                          (max-width: 768px) 50vw,
                          (max-width: 1024px) 33.3vw,
                          512px"
                        className="object-cover"
                        alt={favorite.product.name + " cover image"}
                      />
                    </div>
                  </div>
                  <div className="mt-4 p-4">
                    <p className="font-bold text-gray-700">
                      {favorite.product.name}
                    </p>
                    <p className="break-all text-sm text-gray-500 line-clamp-2">
                      {favorite.product.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  )
}

FavoritesPage.getLayout = (page: React.ReactNode) => (
  <ProfileLayout>{page}</ProfileLayout>
)

export default FavoritesPage

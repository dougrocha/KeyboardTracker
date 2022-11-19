import { XMarkIcon } from "@heroicons/react/20/solid"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import ProfileHeader from "../../components/Profile/ProfileHeader"
import ProfileLayout from "../../layouts/ProfileLayout"
import { UseFavorites } from "../../libs/api/AddProductToFavorites"
import { GetUserFavorites } from "../../libs/api/GetUserFavorites"

const FavoritesPage = () => {
  return (
    <>
      <ProfileHeader title="Favorites" />

      <FavoritesContainer />
    </>
  )
}

const FavoritesContainer = () => {
  const { data, isLoading } = useQuery(["user", "favorites"], GetUserFavorites)

  const { removeFavorite } = UseFavorites()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data?.favorites?.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">No Favorites</h1>
        <p className="text-gray-500">You have no favorites yet.</p>
      </div>
    )
  }

  return (
    <>
      {data?.favorites.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.favorites.map((favorite) => (
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
                      {!favorite.product.coverImage ? (
                        <Image
                          src={favorite.product.coverImage ?? "/hero.jpg"}
                          className="object-cover"
                          alt={favorite.product.name + " cover image"}
                          fill
                        />
                      ) : null}
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

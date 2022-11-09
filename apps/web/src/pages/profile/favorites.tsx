import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import React from "react"

import ProfileHeader from "../../components/Profile/ProfileHeader"
import ProfileLayout from "../../layouts/ProfileLayout"
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
  const { data, isLoading } = useQuery(["favorites"], GetUserFavorites)

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
              <Link href={`/products/${favorite.product.id}`}>
                <div className="rounded bg-white p-4 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {favorite.product.coverImage ? (
                        <Image
                          src={favorite.product.coverImage}
                          className="h-10 w-10 rounded-full"
                          alt="Profile Picture"
                          width={40}
                          height={40}
                        />
                      ) : null}
                      <div className="ml-2">
                        <p className="font-bold text-gray-700">
                          {favorite.product.designer?.username}
                        </p>
                        <p className="text-sm text-gray-500">
                          {favorite.product.designer?.name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="font-bold text-gray-700">
                      {favorite.product.name}
                    </p>
                    <p className="text-sm text-gray-500">
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

import React from "react"
import ProfileLayout from "../../layouts/ProfileLayout"

const FavoritesPage = () => {
  return <div>FavoritesPage</div>
}

FavoritesPage.getLayout = (page: React.ReactNode) => (
  <ProfileLayout>{page}</ProfileLayout>
)

export default FavoritesPage

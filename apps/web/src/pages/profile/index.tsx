import React from "react"
import ProfileLayout from "../../layouts/ProfileLayout"

const ProfilePage = () => {
  return (
    <>
      <h1 className="my-10">ProfilePage</h1>
      <h1 className="my-10">ProfilePage</h1>
      <h1 className="my-10">ProfilePage</h1>
      <h1 className="my-10">ProfilePage</h1>
      <h1 className="my-10">ProfilePage</h1>
      <h1 className="my-10">ProfilePage</h1>
      <h1 className="my-10">ProfilePage</h1>
      <h1 className="my-10">ProfilePage</h1>
      <h1 className="my-10">ProfilePage</h1>
      <h1 className="my-10">ProfilePage</h1>
      <h1 className="my-10">ProfilePage</h1>
      <h1 className="my-10">ProfilePage</h1>
      <h1 className="my-10">ProfilePage</h1>
    </>
  )
}

ProfilePage.getLayout = (page: React.ReactNode) => (
  <ProfileLayout>{page}</ProfileLayout>
)

export default ProfilePage

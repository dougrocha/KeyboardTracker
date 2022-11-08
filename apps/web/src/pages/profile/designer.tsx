import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import React from "react"
import ProfileHeader from "../../components/Profile/ProfileHeader"
import ProfileLayout from "../../layouts/ProfileLayout"
import { GetProfileInformation } from "../../libs/api/GetMe"

const DesignerPage = () => {
  const router = useRouter()

  const { data, isLoading } = useQuery(["profile"], GetProfileInformation)

  if (!data?.designer) return <DesignerCreatePage />

  return (
    <>
      <ProfileHeader title="Designer" />
    </>
  )
}

DesignerPage.getLayout = (page: React.ReactNode) => (
  <ProfileLayout>{page}</ProfileLayout>
)

const DesignerCreatePage = () => {
  return (
    <>
      <ProfileHeader title="Create your designer today!" />
    </>
  )
}

export default DesignerPage

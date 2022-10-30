import React from "react"
import ProfileLayout from "../../layouts/ProfileLayout"

const SettingsPage = () => {
  return <div>SettingsPage</div>
}

SettingsPage.getLayout = (page: React.ReactNode) => (
  <ProfileLayout>{page}</ProfileLayout>
)

export default SettingsPage

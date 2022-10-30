import React from "react"
import ProfileLayout from "../../layouts/ProfileLayout"

const DesignerPage = () => {
  const isDesigner = false

  if (!isDesigner) return <div>Join here</div>

  return <div>DesignerPage</div>
}

DesignerPage.getLayout = (page: React.ReactNode) => (
  <ProfileLayout>{page}</ProfileLayout>
)

export default DesignerPage

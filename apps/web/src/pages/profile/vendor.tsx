import React from "react"
import ProfileLayout from "../../layouts/ProfileLayout"

const VendorPage = () => {
  const isVendor = false

  if (!isVendor) return <div>Join here</div>

  return <div>VendorPage</div>
}

VendorPage.getLayout = (page: React.ReactNode) => (
  <ProfileLayout>{page}</ProfileLayout>
)

export default VendorPage

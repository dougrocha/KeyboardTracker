import { Vendor } from "@meka/database"
import React from "react"

import VendorLayout from "../../../../layouts/VendorLayout"

const VendorPage = ({ vendor }: { vendor: Vendor }) => {
  return (
    <>
      <div>HELLO: {vendor?.name}</div>
    </>
  )
}

VendorPage.getLayout = (page: React.ReactNode) => (
  <VendorLayout>{page}</VendorLayout>
)

export default VendorPage

import { PlusIcon } from "@heroicons/react/20/solid"
import { Vendor } from "@meka/database"
import React from "react"

import VendorLayout from "../../../../layouts/VendorLayout"

const VendorPage = ({ vendor }: { vendor: Vendor }) => {
  return (
    <>
      <div className="grid grid-flow-dense grid-cols-3 grid-rows-6 gap-8">
        <div className="col-span-full row-span-2 flex justify-between">
          <div className="space-y-4">
            <span className="text-xl font-bold">
              Welcome! Start by making your first product
            </span>
            <button className="flex items-center justify-center space-x-2 rounded bg-indigo-500 px-3 py-1 text-white">
              <span className="whitespace-nowrap text-lg font-medium">
                Create Product
              </span>
              <PlusIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div className="col-span-1">
          <div className="h-full w-full rounded bg-red-200 p-10" />
        </div>
        <div className="col-span-2 row-span-2">
          <div className="h-full w-full rounded bg-green-200 p-10" />
        </div>
        <div className="col-span-2 row-span-1">
          <div className="h-full w-full rounded bg-slate-200 p-10" />
        </div>
        <div className="col-span-2 row-span-2">
          <div className="h-full w-full rounded bg-green-200 p-10" />
        </div>
      </div>
    </>
  )
}

VendorPage.getLayout = (page: React.ReactNode) => (
  <VendorLayout>{page}</VendorLayout>
)

export default VendorPage

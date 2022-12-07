import { PlusIcon } from "@heroicons/react/20/solid"
import { Vendor } from "@meka/database"
import React from "react"

import CreateVendorProduct from "../../../../components/CreateVendorProduct"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeading,
  DialogDescription,
  DialogClose,
} from "../../../../components/ModalDialog"
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
            <Dialog initialOpen>
              <DialogTrigger className="flex items-center justify-center space-x-2 rounded bg-indigo-500 px-3 py-1 text-white">
                <span className="whitespace-nowrap text-lg font-medium">
                  Create Product
                </span>
                <PlusIcon className="h-6 w-6" />
              </DialogTrigger>
              <DialogContent className="m-4 max-w-4xl rounded bg-primary-light px-2 py-12 sm:px-8 lg:w-1/2">
                <DialogHeading className="text-3xl font-semibold">
                  Create a new Product
                </DialogHeading>
                <DialogDescription className="mt-2 text-lg text-neutral-600">
                  Don&apos;t worry you can always edit this later.
                </DialogDescription>
                <CreateVendorProduct />
                <DialogClose className="mt-6 w-full rounded bg-red-400 px-4 py-2 font-medium text-black">
                  Cancel
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  )
}

VendorPage.getLayout = (page: React.ReactNode) => (
  <VendorLayout>{page}</VendorLayout>
)

export default VendorPage

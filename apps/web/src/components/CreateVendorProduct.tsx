import { ArrowPathIcon, CheckCircleIcon } from "@heroicons/react/20/solid"
import { yupResolver } from "@hookform/resolvers/yup"
import { AddVendorProduct } from "@meka/types"
import React from "react"
import * as yup from "yup"

import Form from "./Forms/Form"
import Input from "./Forms/Input"
import Number from "./Forms/Number"
import { DialogClose, useDialogState } from "./ModalDialog"

import { useCreateVendorProduct } from "../libs/api/Vendor"

const schema = yup.object().shape({
  // This vendor id is not needed for form submission
  // vendorId: yup.string().required("Vendor id is required"),
  productId: yup.string().required("Product id is required"),
  price: yup.number().required(),
})

const CreateVendorProduct = ({ vendorId }: { vendorId: string }) => {
  const { setOpen } = useDialogState()

  const { createProduct, isLoading, isSuccess } = useCreateVendorProduct({
    vendorId,
  })

  // Form will not have vendorId, but will be filled in by page
  const onSubmit = (data: Omit<AddVendorProduct, "vendorId">) => {
    createProduct({
      vendorId,
      ...data,
    })
  }

  return (
    <>
      <Form<AddVendorProduct>
        onSubmit={onSubmit}
        resolver={yupResolver(schema)}
        className="mt-4 flex flex-col gap-y-4"
      >
        <Input
          id="productId"
          name="productId"
          label="Product Id"
          required
          helperText="You must get this id from the designer product."
        />

        {/* Make dropdown box that allows vendor to select products */}
        <Number id="price" label="Price" prefix="$ " />

        <div className="flex flex-row items-center justify-end gap-x-4">
          <DialogClose
            type="button"
            className="flex items-center gap-x-2 rounded-md bg-gray-300 px-4 py-2 text-gray-800 shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
          >
            Cancel
          </DialogClose>

          <button
            type="submit"
            className="flex items-center gap-x-2 rounded-md bg-gray-800 px-4 py-2 text-white shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
          >
            {isLoading && !isSuccess ? (
              <span className="animate-spin">
                <ArrowPathIcon className="h-5 w-5" />
              </span>
            ) : (
              "Create"
            )}
            {isSuccess && (
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            )}
          </button>
        </div>
      </Form>
    </>
  )
}

export default CreateVendorProduct

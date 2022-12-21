import { ArrowPathIcon, CheckCircleIcon } from "@heroicons/react/20/solid"
import { Product, ProductWithPrice, Vendor } from "@meka/database"
import { PaginationState } from "@tanstack/react-table"
import { useRouter } from "next/router"
import React from "react"

import Form from "../../../../components/Forms/Form"
import Input from "../../../../components/Forms/Input"
import { DialogClose, useDialogState } from "../../../../components/ModalDialog"
import ProductsTable from "../../../../components/ProductsTable"
import VendorLayout from "../../../../layouts/VendorLayout"
import {
  useGetVendorProducts,
  useUpdateVendorProduct,
} from "../../../../libs/api/Vendor"

const VendorProductsPage = ({ vendor }: { vendor: Vendor }) => {
  return (
    <>
      <VendorTable id={vendor.id} />
    </>
  )
}

const VendorTable = ({ id }: { id: string }) => {
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    })

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )

  const { products, count, isLoading, error, refetch, isRefetching } =
    useGetVendorProducts(id ?? "", {
      page: pageIndex + 1,
      perPage: pageSize,
    })

  if (isLoading) return <div>Loading...</div>

  return (
    <ProductsTable
      products={products}
      productCount={count}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      isRefetching={isRefetching}
      pagination={pagination}
      setPagination={setPagination}
      editComponent={EditProductView}
    />
  )
}

interface EditProductViewProps {
  product: ProductWithPrice | Product
}

const EditProductView = ({ product }: EditProductViewProps) => {
  const { setOpen } = useDialogState()

  const {
    query: { id },
  } = useRouter()

  const vendorId = id as string

  const { updateProduct, isLoading, isSuccess } = useUpdateVendorProduct({
    vendorId,
    productId: product.id,
  })

  const onSubmit = async (data: ProductWithPrice) => {
    updateProduct({
      price: data.price,
    })
    setTimeout(() => setOpen(false), 1000)
  }

  return (
    <Form<ProductWithPrice>
      onSubmit={onSubmit}
      defaultValues={product}
      className="mt-4 flex flex-col gap-y-4"
    >
      <Input
        id={`price`}
        label="Price"
        type="number"
        placeholder={(product as ProductWithPrice).price?.toString()}
        min={0}
        step={0.01}
        className="rounded border"
      />

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
          {isSuccess && <CheckCircleIcon className="h-5 w-5 text-green-500" />}
        </button>
      </div>
    </Form>
  )
}

VendorProductsPage.getLayout = (page: React.ReactNode) => (
  <VendorLayout>{page}</VendorLayout>
)

export default VendorProductsPage

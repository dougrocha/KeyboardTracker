import { Vendor } from "@meka/database"
import { PaginationState } from "@tanstack/react-table"
import React from "react"

import ProductsTable from "../../../../components/ProductsTable"
import VendorLayout from "../../../../layouts/VendorLayout"
import { useGetVendorProducts } from "../../../../libs/api/Vendor"

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
    />
  )
}

VendorProductsPage.getLayout = (page: React.ReactNode) => (
  <VendorLayout>{page}</VendorLayout>
)

export default VendorProductsPage

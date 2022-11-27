import { PaginationState } from "@tanstack/react-table"
import React from "react"

import ProductsTable from "../../../../components/ProductsTable"
import {
  UseGetVendorProducts,
  UseGetVendors,
} from "../../../../libs/api/Vendor"

const VendorProductsPage = () => {
  const { vendors } = UseGetVendors()

  if (!vendors) return <div>Join here</div>

  return (
    <>
      <VendorTable />
    </>
  )
}

const VendorTable = () => {
  const { vendors } = UseGetVendors()

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
    UseGetVendorProducts(vendors?.[0].id ?? "", {
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

export default VendorProductsPage

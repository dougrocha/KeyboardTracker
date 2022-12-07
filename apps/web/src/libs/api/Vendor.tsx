import { ProductWithPrice, Vendor } from "@meka/database"
import {
  AddVendorProduct,
  PaginatedResults,
  PaginationParams,
} from "@meka/types"
import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query"

import AxiosClient from "../AxiosClient"

const GetMyVendorUrl = async () => {
  const data = await AxiosClient.get<Vendor[]>(`user/me/vendors`)
  return data.data
}

const GetVendorProducts = async (
  id: string,
  pagination: PaginationParams = { page: 1, perPage: 10 }
): Promise<PaginatedResults<ProductWithPrice>> => {
  const { data } = await AxiosClient.get(
    `/vendor/${id}/products?page=${pagination.page}&perPage=${pagination.perPage}`
  )
  return data
}

const GetVendorUrl = async (id: string) => {
  const data = await AxiosClient.get<Vendor>(`vendor/${id}`)
  return data.data
}

const CreateVendorProductUrl = async (product: AddVendorProduct) => {
  const { data } = await AxiosClient.post<AddVendorProduct>(
    `/vendor/${product.vendorId}/products`,
    product
  )
  return data
}

export const useCreateVendorProduct = ({
  vendorId,
  productId,
}: {
  vendorId: string
  productId: string
}) => {
  const { mutate, ...rest } = useMutation(
    ["vendor", vendorId, "products", productId],
    CreateVendorProductUrl
  )

  return { createProduct: mutate, ...rest }
}

export const useGetVendors = (
  options: UseQueryOptions<Vendor[], Error, Vendor[], string[]> = {}
) => {
  const { data, ...rest } = useQuery(
    ["user", "vendors"],
    () => GetMyVendorUrl(),
    options
  )

  return { vendors: data, ...rest }
}

export const useGetVendorProducts = (
  id: string,
  pagination?: PaginationParams
) => {
  const { data, ...rest } = useQuery(
    ["vendor", id, "products", pagination],
    () => GetVendorProducts(id, pagination),
    {
      enabled: !!id,
      keepPreviousData: true,
    }
  )

  return {
    products: data?.data,
    count: data?.count,
    ...rest,
  }
}

export const useGetVendor = (
  id: string,
  options: UseQueryOptions<Vendor, Error, Vendor, string[]> = {}
) => {
  const { data, ...rest } = useQuery(
    ["vendor", id],
    () => GetVendorUrl(id),
    options
  )

  return { vendor: data, ...rest }
}

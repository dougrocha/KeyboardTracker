import { useQuery, UseQueryOptions } from "@tanstack/react-query"

import { PaginationParams } from "./types"

import { Vendor } from "../../types/image"
import { Product } from "../../types/product"
import AxiosClient from "../AxiosClient"

interface VendorProducts {
  products: Product[]
  count: number
}

const GetVendorUrl = async () => {
  const data = await AxiosClient.get<Vendor[]>(`user/me/vendor`)
  return data.data
}

const GetVendorProducts = async (
  id: string,
  pagination: PaginationParams = { page: 1, perPage: 10 }
): Promise<VendorProducts> => {
  const { data } = await AxiosClient.get(
    `/vendor/${id}/products?page=${pagination.page}&perPage=${pagination.perPage}`
  )
  return data
}

export const UseGetVendors = (
  options: UseQueryOptions<Vendor[], Error, Vendor[], string[]> = {}
) => {
  const { data, ...rest } = useQuery(
    ["user", "vendors"],
    () => GetVendorUrl(),
    options
  )

  return { vendors: data, ...rest }
}

export const UseGetVendorProducts = (
  id: string,
  pagination?: PaginationParams
) => {
  const { data, ...rest } = useQuery(
    ["vendor", id, "products", pagination],
    () => GetVendorProducts(id, pagination),
    {
      enabled: !!id,
    }
  )

  return {
    products: data?.products,
    count: data?.count,
    ...rest,
  }
}

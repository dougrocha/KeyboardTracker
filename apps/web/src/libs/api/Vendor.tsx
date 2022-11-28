import { useQuery, UseQueryOptions } from "@tanstack/react-query"

import { PaginationParams } from "./types"

import { Vendor } from "../../types/vendor"
import { Product } from "../../types/product"
import AxiosClient from "../AxiosClient"

interface VendorProducts {
  products: Product[]
  count: number
}

const GetMyVendorUrl = async () => {
  const data = await AxiosClient.get<Vendor[]>(`user/me/vendors`)
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

const GetVendorUrl = async (id: string) => {
  const data = await AxiosClient.get<Vendor>(`vendor/${id}`)
  return data.data
}

export const UseGetVendors = (
  options: UseQueryOptions<Vendor[], Error, Vendor[], string[]> = {}
) => {
  const { data, ...rest } = useQuery(
    ["user", "vendors"],
    () => GetMyVendorUrl(),
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

export const UseGetVendor = (
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

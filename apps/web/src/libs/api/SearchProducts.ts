import { Product } from "@meka/database"
import { PaginatedResults, PaginationParams } from "@meka/types"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"

import AxiosClient from "../AxiosClient"

interface AllSearchQueries {
  material?: string
  vendor?: string
  brand?: string
  type?: string
  status?: string
}

/**
 * Search products
 *
 * Will not run if search is empty
 */
export const SearchProducts = async (
  search?: string,
  pagination?: PaginationParams,
  allQueries?: AllSearchQueries
): Promise<PaginatedResults<Product>> => {
  if (!search) return { data: [], count: 0 }

  const { material, vendor, brand, type, status } = allQueries ?? {}

  const res = await AxiosClient.get<PaginatedResults<Product>>(
    `/product/search/v1`,
    {
      params: {
        search,
        ...pagination,
        ...(material && { material }),
        ...(vendor && { vendor }),
        ...(brand && { brand }),
        ...(type && { type }),
        ...(status && { status }),
      },
    }
  )

  return res.data
}

export const useProductSearch = (
  search?: string,
  pagination?: PaginationParams,
  options?: UseQueryOptions<
    PaginatedResults<Product>,
    unknown,
    PaginatedResults<Product>,
    (string | undefined)[]
  >
) => {
  return useQuery(
    ["search", search],
    () => SearchProducts(search, pagination),
    {
      ...(options ?? {
        enabled: !!search,
        suspense: true,
      }),
    }
  )
}

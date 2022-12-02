import { Product } from "@meka/database"
import { PaginationParams } from "@meka/types"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"

import AxiosClient from "../AxiosClient"

/**
 * Search products
 *
 * Will not run if search is empty
 */
export const SearchProducts = async (
  search?: string,
  pagination?: PaginationParams
): Promise<Product[]> => {
  if (!search) return []

  const res = await AxiosClient.get(`/product/search/v1`, {
    params: {
      search,
      ...pagination,
    },
  })

  return res.data
}

export const useProductSearch = (
  search?: string,
  pagination?: PaginationParams,
  options?: UseQueryOptions<
    Product[],
    unknown,
    Product[],
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

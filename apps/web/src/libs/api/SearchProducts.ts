import { PaginationParams } from "./types"

import { Product } from "../../types/product"
import AxiosClient from "../AxiosClient"

/**
 * Search products
 *
 * Will not run if search is empty
 */
export const SearchProducts = async (
  search: string,
  { perPage = 100, page = 1 }: PaginationParams
): Promise<Product[]> => {
  if (!search) return []

  const res = await AxiosClient.get(`/products/search`, {
    params: { search, perPage, page },
  })

  return res.data
}

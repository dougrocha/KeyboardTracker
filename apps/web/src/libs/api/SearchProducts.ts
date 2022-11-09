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
  { take, skip }: PaginationParams = { take: 10, skip: 0 }
): Promise<Product[]> => {
  if (!search) return []
  const res = await AxiosClient.get(`/products`, {
    params: { search, take, skip },
  })

  return res.data
}

import AxiosClient from "../AxiosClient"
import { PaginationParams } from "./types"

/**
 * Search products
 * @param search Search query
 * @param param1 Pagination params
 * @default { take: 10, skip: 0 }
 * @returns Products
 */
export const SearchProducts = async (
  search: string,
  { take, skip }: PaginationParams = { take: 10, skip: 0 }
) => {
  const res = await AxiosClient.get(
    `/products/search?take=${take}&skip=${skip}`,
    {
      data: {
        search,
      },
    }
  )
  return res.data
}

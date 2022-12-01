import { GroupBuyStatus, Product } from "@meka/database"
import { PaginatedResults, PaginationParams } from "@meka/types"

import AxiosClient from "../AxiosClient"

/**
 *
 * @param status Group buy status
 * @param pagination Pagination params
 * @returns Products
 *
 */
export default async function GetProductsByStatus(
  status: GroupBuyStatus,
  pagination: PaginationParams = { page: 1, perPage: 10 }
): Promise<PaginatedResults<Product>> {
  const res = await AxiosClient.get<PaginatedResults<Product>>(
    `/product/status/${status}`,
    {
      params: pagination,
    }
  )
  return res.data
}

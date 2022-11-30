import { PaginationParams } from "@meka/types"

import { GroupBuyStatus } from "../../types/groupBuyStatus"
import { Product } from "../../types/product"
import AxiosClient from "../AxiosClient"

/**
 *
 * @param status Group buy status
 * @param pagination Pagination params
 * @default { take: 100, skip: 0 }
 * @returns Products
 *
 */
export default async function GetProductsByStatus(
  status: GroupBuyStatus,
  { perPage, page }: PaginationParams = { perPage: 100, page: 1 }
): Promise<Product[]> {
  const res = await AxiosClient.get<Product[]>(
    `/product/status/${status}?perPage=${perPage}&page=${page}`
  )
  return res.data
}

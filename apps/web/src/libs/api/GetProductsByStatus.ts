import { takeCoverage } from "v8"
import { GroupBuyStatus } from "../../types/groupBuyStatus"
import { Product } from "../../types/product"
import AxiosClient from "../AxiosClient"
import { PaginationParams } from "./types"

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
  { skip, take }: PaginationParams = { skip: 0, take: 10 }
): Promise<Product[]> {
  const res = await AxiosClient.get<Product[]>(
    `/products/status/${status}?skip=${skip}&take=${take}`
  )
  return res.data
}

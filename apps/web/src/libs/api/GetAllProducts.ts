import { PaginationParams } from "./types"

import { Product } from "../../types/product"
import AxiosClient from "../AxiosClient"

type ProductId = Pick<Product, "id">

/**
 * @default { take: 100, skip: 0 }
 */
export async function GetAllProducts({
  perPage = 100,
  page = 1,
}: PaginationParams) {
  const data = await AxiosClient.get<Product[]>(
    `/product?perPage=${perPage}&page=${page}`
  )

  return data.data
}

export async function GetAllProductIds({
  perPage = 100,
  page = 1,
}: PaginationParams) {
  const res = await AxiosClient.get<ProductId[]>(
    `/product?perPage=${perPage}&page=${page}`
  )
  return res.data
}

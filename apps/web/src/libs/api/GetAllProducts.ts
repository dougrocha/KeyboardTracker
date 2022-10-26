import { Product } from "../../types/product"
import AxiosClient from "../AxiosClient"
import { PaginationParams } from "./types"

type ProductId = Pick<Product, "id">

/**
 * @default { take: 100, skip: 0 }
 */
export async function GetAllProducts({
  take = 100,
  skip = 0,
}: PaginationParams) {
  const data = await AxiosClient.get<Product[]>(
    `/products/all?take=${take}&skip=${skip}&products=${true}`
  )

  return data.data
}

export async function GetAllProductIds({
  take = 100,
  skip = 0,
}: PaginationParams) {
  const res = await AxiosClient.get<ProductId[]>(
    `/products/all?take=${take}&skip=${skip}`
  )
  return res.data
}

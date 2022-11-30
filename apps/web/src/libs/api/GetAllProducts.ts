import { Product } from "@meka/database"
import { PaginatedResults, PaginationParams } from "@meka/types"

import AxiosClient from "../AxiosClient"

export async function GetAllProducts({
  perPage = 100,
  page = 1,
}: PaginationParams) {
  const { data } = await AxiosClient.get<PaginatedResults<Product>>(
    `/product?perPage=${perPage}&page=${page}&product=true`
  )

  return data
}

export async function GetAllProductIds({
  perPage = 100,
  page = 1,
}: PaginationParams) {
  const { data } = await AxiosClient.get<PaginatedResults<Pick<Product, "id">>>(
    `/product?perPage=${perPage}&page=${page}`
  )
  return data
}

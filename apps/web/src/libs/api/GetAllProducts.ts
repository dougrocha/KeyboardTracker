import { Product } from "@meka/database"
import { PaginatedResults, PaginationParams } from "@meka/types"

import AxiosClient from "../AxiosClient"

export async function GetAllProducts({ perPage, page }: PaginationParams) {
  const { data } = await AxiosClient.get<PaginatedResults<Product>>(
    `/product`,
    {
      params: {
        perPage,
        page,
        product: true,
      },
    }
  )

  return data
}

export async function GetAllProductIds({ page, perPage }: PaginationParams) {
  const { data } = await AxiosClient.get<Pick<Product, "id">[]>(`/product`, {
    params: {
      perPage,
      page,
    },
  })
  return data
}

import { ProductVendorWithVendors, ProductIncludeAll } from "@meka/database"

import AxiosClient from "../AxiosClient"

export const FindOneProduct = async (id: string) => {
  const data = await AxiosClient.get<ProductIncludeAll>(`/product/${id}`)
  return data.data
}

export const FindProductVendors = async (id: string) => {
  const data = await AxiosClient.get<ProductVendorWithVendors[]>(
    `/product/${id}/vendors`
  )
  return data.data
}

import { Product } from "../../types/product"
import { ProductVendors } from "../../types/productVendors"
import AxiosClient from "../AxiosClient"

export const FindOneProduct = async (id: string) => {
  const data = await AxiosClient.get<Product>(`/products/${id}`)
  return data.data
}

type ProductVendorsResponse = Required<
  Pick<ProductVendors, "id" | "productId" | "vendor" | "vendorId">
>

export const FindProductVendors = async (id: string) => {
  const data = await AxiosClient.get<ProductVendorsResponse[]>(
    `/products/${id}/vendors`
  )
  return data.data
}

import { Vendor } from "./image"
import { Product } from "./product"

export interface ProductVendors {
  id: string
  vendorId: string
  productId: string
  vendor?: Vendor
  product?: Product
}

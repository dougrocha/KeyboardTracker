import { Product } from "./product"
import { Vendor } from "./vendor"

export interface ProductVendors {
  id: string
  vendorId: string
  productId: string
  vendor?: Vendor
  product?: Product
}

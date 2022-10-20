import { Designer } from "./designer"
import { GroupBuyStatus } from "./groupBuyStatus"
import { Vendor } from "./image"
import { Keyboard } from "./keyboard"
import { KeycapSet } from "./keycapSet"
import { ProductType } from "./productType"
import { YearQuarter } from "./yearQuarter"

export interface Product {
  id: string
  name: string
  description?: string
  brand?: string
  policy?: string
  layout?: string
  interestCheckUrl?: string
  groupBuyUrl?: string
  groupBuyStartDate?: Date
  groupBuyEndDate?: Date
  coverImage?: string
  images?: Image[]
  type: ProductType
  status: GroupBuyStatus
  estimatedDeliveryYear?: number
  estimatedDeliveryQuarter?: YearQuarter
  price?: number
  keycapSet?: KeycapSet
  keyboard?: Keyboard
  vendors?: Vendor[]
  designer?: Designer
}

export interface Image {
  id: number
  title?: string
  description?: string
  imgUrl: string
}

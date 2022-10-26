import { Product } from "./product"

export interface Designer {
  id: string
  username: string
  name: string
  twitterHandler?: string
  redditUsername?: string
  products?: Product[]
  joinedAt: Date
}

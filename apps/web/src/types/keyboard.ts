import { Image } from "./product"

export interface Keyboard {
  id: string
  angle?: number
  mountStyle?: string
  hotswap?: boolean
  size?: string
  images?: Image[]
  updatedAt: Date
}

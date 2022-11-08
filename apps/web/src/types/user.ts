import { Designer } from "./designer"
import { Image, Product } from "./product"

export interface User {
  id: string
  username: string
  email: string
  name?: string
  password?: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
  designer?: Designer
  favorites?: UserFavorite[]
  images?: Image[]
}

export interface UserFavorite {
  id: string
  userId: string
  user: User
  productId: string
  product: Product
  createdAt: Date
}

export type LoginFormData = Required<Pick<User, "email" | "password">>

export interface ProtectedAuth {
  user?: User
  isLoggedIn: boolean
}

export interface DiscordIdentity {
  id: string
  discordId: string
  username: string
  discriminator: string
  avatar: string
  email?: string
  mfaEnabled?: boolean
  connectedAt: Date
}

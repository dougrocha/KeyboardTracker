import { Designer } from "./designer"
import { Image, Product } from "./product"

export interface User {
  id: string
  username: string
  email: string
  name?: string
  password?: string
  avatar?: string
  theme?: UserTheme
  createdAt: Date
  updatedAt: Date
  discordIdentity?: DiscordIdentity
  designer?: Designer
  favorites?: UserFavorite[]
  images?: Image[]
}

export const UserTheme = {
  LIGHT: "Light",
  DARK: "Dark",
  SYSTEM: "System",
} as const

export type UserTheme = typeof UserTheme[keyof typeof UserTheme]

export interface UserFavorite {
  id: string
  userId: string
  user: User
  productId: string
  product: Product
  createdAt: Date
}

export type LoginFormData = Required<Pick<User, "email" | "password">>

export type RegisterFormData = Required<
  Pick<User, "username" | "email" | "password" | "name">
>

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

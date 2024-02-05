import { User } from "@prisma/client"

export type LoginFormData = Required<Pick<User, "email" | "password">>

export type RegisterFormData = Required<
  Pick<User, "username" | "email" | "password" | "name">
>

export interface ProtectedAuth {
  user?: User
  isLoggedIn: boolean
}

export { User }

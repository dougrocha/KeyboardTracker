export interface User {
  name?: string
  email: string
  username: string
  avatar?: string
}

export interface ProtectedAuth {
  user?: User
  isLoggedIn: boolean
}

export interface User {
  id: string
  name?: string
  email: string
  username: string
  avatar?: string
}

export interface ProtectedAuth {
  user?: User
  isLoggedIn: boolean
}

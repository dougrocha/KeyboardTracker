// Make a localLogin function with axios

import axios from "axios"

export const localLogin = async (email: string, password: string) => {
  const { data } = await axios.post("/api/auth/login", { email, password })
  return data
}

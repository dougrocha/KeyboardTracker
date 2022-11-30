import { ProtectedAuth } from "@meka/database"

import AxiosClient from "../AxiosClient"

const CheckProtectedRoute = async (): Promise<ProtectedAuth> => {
  return await AxiosClient.get("/auth/protected").then((res) => {
    return res.data
  })
}

export default CheckProtectedRoute

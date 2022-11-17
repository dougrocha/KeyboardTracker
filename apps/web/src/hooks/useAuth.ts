import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

import CheckProtectedRoute from "../libs/api/FetchProtectedRoute"

const useAuth = () => {
  const router = useRouter()

  const {
    data: user,
    isLoading,
    error,
  } = useQuery(["user"], async () => (await CheckProtectedRoute()).user, {
    retry: false,
  })

  const logoutUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`

  const logout = () => router.push(logoutUrl)

  return { user, isLoading, error, logout, logoutUrl }
}

export default useAuth

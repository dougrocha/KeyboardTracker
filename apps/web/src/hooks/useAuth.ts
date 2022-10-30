import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import CheckProtectedRoute from "../libs/api/FetchProtectedRoute"

const useAuth = () => {
  const router = useRouter()

  const { data, isLoading, error } = useQuery(
    ["auth"],
    async () => await CheckProtectedRoute(),
    {
      retry: false,
    }
  )

  const logoutUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`

  const logout = () => router.push(logoutUrl)

  return { data, isLoading, error, logout, logoutUrl }
}

export default useAuth

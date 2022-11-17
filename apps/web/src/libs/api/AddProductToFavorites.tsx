import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query"

import { User } from "../../types/user"
import AxiosClient from "../AxiosClient"

export const AddProductToFavorites = async (id: string) => {
  const data = await AxiosClient.post<User>(`/users/me/favorites`, {
    id,
  })
  return data.data
}

export const RemoveProductFromFavorites = async (id: string) => {
  const data = await AxiosClient.delete<User>(`/users/me/favorites`, {
    data: { id },
  })
  return data.data
}

export const UseFavorites = (
  options?: UseMutationOptions<User, unknown, string>
) => {
  const queryClient = useQueryClient()

  const op: UseMutationOptions<User, unknown, string> = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "favorites"] })
    },
    ...options,
  }

  const addFavorite = useMutation(
    ["user", "favorites"],
    AddProductToFavorites,
    op
  )
  const removeFavorite = useMutation(
    ["user", "favorites"],
    RemoveProductFromFavorites,
    op
  )

  return { addFavorite, removeFavorite }
}

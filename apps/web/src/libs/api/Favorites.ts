import { Product, UserProductFavorite } from "@meka/database"
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"

import AxiosClient from "../AxiosClient"

interface FavoritesResponse extends UserProductFavorite {
  product: Product
}

export const GetUserFavorites = async () => {
  const { data } = await AxiosClient.get<FavoritesResponse[]>(
    `/user/me/favorites`
  )
  return data
}

export const AddProductToFavorites = async (id: number) => {
  const data = await AxiosClient.post<FavoritesResponse[]>(
    `/user/me/favorites`,
    {
      id,
    }
  )
  return data.data
}

export const RemoveProductFromFavorites = async (id: number) => {
  const data = await AxiosClient.delete<FavoritesResponse[]>(
    `/user/me/favorites`,
    {
      data: { id },
    }
  )
  return data.data
}

export const UseFavorites = (
  options?: UseMutationOptions<FavoritesResponse[], unknown, number>
) => {
  const queryClient = useQueryClient()

  const op: UseMutationOptions<FavoritesResponse[], unknown, number> = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "favorites"] })
    },
    ...options,
  }

  const getFavorites = useQuery(["user", "favorites"], () => GetUserFavorites())

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

  return { favorites: { ...getFavorites }, addFavorite, removeFavorite }
}

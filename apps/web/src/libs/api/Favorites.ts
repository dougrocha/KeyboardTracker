import { Product, UserProductFavorite } from "@meka/database"
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
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

export const AddProductToFavorites = async (id: string) => {
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
  options?: UseQueryOptions<
    FavoritesResponse[],
    unknown,
    FavoritesResponse[],
    string[]
  >,
  mutationOptions?: UseMutationOptions<
    FavoritesResponse[],
    unknown,
    string | number
  >
) => {
  const queryClient = useQueryClient()

  const op: UseMutationOptions<FavoritesResponse[], unknown, string | number> =
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user", "favorites"] })
      },
      ...mutationOptions,
    }

  const getFavorites = useQuery(
    ["user", "favorites"],
    () => GetUserFavorites(),
    options
  )

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

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

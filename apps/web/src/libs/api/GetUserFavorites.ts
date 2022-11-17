import { User } from "../../types/user"
import AxiosClient from "../AxiosClient"

export async function GetUserFavorites(): Promise<User> {
  const res = await AxiosClient.get<User>(`/users/me/favorites`)
  return res.data
}

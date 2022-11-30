import { User } from "../../types/protected-auth"
import AxiosClient from "../AxiosClient"

export async function GetUserFavorites(): Promise<User> {
  const res = await AxiosClient.get<User>(`/user/me/favorites`)
  return res.data
}

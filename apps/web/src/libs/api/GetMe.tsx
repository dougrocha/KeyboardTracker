import { User } from "../../types/user"
import AxiosClient from "../AxiosClient"

export async function GetProfileInformation(): Promise<User> {
  const res = await AxiosClient.get<User>(`/users/me`)
  return res.data
}

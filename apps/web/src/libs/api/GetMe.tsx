import { User } from "../../types/user"
import AxiosClient from "../AxiosClient"

export async function GetProfileInformation() {
  const res = await AxiosClient.get<User>(`/users/`)
  return res.data
}

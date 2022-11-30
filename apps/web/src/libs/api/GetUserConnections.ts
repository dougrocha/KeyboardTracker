import { DiscordIdentity } from "../../types/protected-auth"
import AxiosClient from "../AxiosClient"

interface UserConnections {
  discord: DiscordIdentity
}

export async function GetUserConnections(): Promise<UserConnections> {
  const res = await AxiosClient.get<UserConnections>(`/user/me/connections`)
  return res.data
}

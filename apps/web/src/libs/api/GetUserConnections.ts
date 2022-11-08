import AxiosClient from "../AxiosClient"

export async function GetUserConnections(): Promise<any> {
  const res = await AxiosClient.get<any>(`/users/me/connections`)
  return res.data
}

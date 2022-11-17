import { useMutation, UseMutationOptions } from "@tanstack/react-query"

import { User } from "../../types/user"
import AxiosClient from "../AxiosClient"

export async function GetProfileInformation(): Promise<User> {
  const res = await AxiosClient.get<User>(`/users/me`)
  return res.data
}

export async function UpdateMe(data: User): Promise<User> {
  const res = await AxiosClient.patch<User>(`/users/me`, data)
  return res.data
}

export function UseUpdateUser(options?: UseMutationOptions<User, Error, User>) {
  return useMutation(["user"], UpdateMe, options)
}

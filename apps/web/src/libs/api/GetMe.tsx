import { User } from "@meka/database"
import { useMutation, UseMutationOptions } from "@tanstack/react-query"

import AxiosClient from "../AxiosClient"

interface AvatarReturn {
  fileId: string
}

export async function DeleteProfile(): Promise<void> {
  const res = await AxiosClient.delete<void>(`/user/me`)
  return res.data
}

export async function GetProfileInformation(): Promise<User> {
  const res = await AxiosClient.get<User>(`/user/me`)
  return res.data
}

export async function UpdateMe(data: User): Promise<User> {
  const res = await AxiosClient.patch<User>(`/user/me`, data)
  return res.data
}

export async function UpdateMeAvatar(data: File): Promise<AvatarReturn> {
  const formData = new FormData()
  formData.append("avatar", data)

  const res = await AxiosClient.patch<AvatarReturn>(
    `/user/me/avatar`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )
  return res.data
}

export function UseUpdateUser(options?: UseMutationOptions<User, Error, User>) {
  return useMutation(["user"], UpdateMe, options)
}

export function UseUpdateUserAvatar(
  options?: UseMutationOptions<AvatarReturn, Error, File>
) {
  return useMutation(["user", "avatar"], UpdateMeAvatar, {
    ...options,
  })
}

export function UseDeleteProfile(
  options?: UseMutationOptions<void, Error, void>
) {
  return useMutation(["user"], DeleteProfile, options)
}

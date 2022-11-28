import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query"

import { User } from "../../types/user"
import AxiosClient from "../AxiosClient"

interface AvatarReturn {
  fileId: string
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
  const queryClient = useQueryClient()
  return useMutation(["user", "avatar"], UpdateMeAvatar, {
    onSuccess: (data) => {
      // update user cache with new avatar id
      queryClient.setQueryData<Pick<User, "avatar">>(["user"], (old) => ({
        ...old,
        avatar: data.fileId,
      }))
    },
    ...options,
  })
}

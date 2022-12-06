import { LoginFormData, RegisterFormData } from "@meka/database"
import { useMutation } from "@tanstack/react-query"

import AxiosClient from "../AxiosClient"

export const localLoginUrl = async ({ email, password }: LoginFormData) => {
  const { data } = await AxiosClient.post("/auth/login", {
    email,
    password,
  })
  return data
}

export const useLocalLogin = () => {
  return useMutation(["user"], localLoginUrl)
}

export const localRegister = async ({
  email,
  password,
  name,
  username,
}: RegisterFormData) => {
  const { data } = await AxiosClient.post("/auth/register", {
    email,
    password,
    name,
    username,
  })
  return data
}

export const useLocalRegister = () => {
  return useMutation(["user"], localRegister)
}

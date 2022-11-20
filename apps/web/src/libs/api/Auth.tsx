import { useMutation } from "@tanstack/react-query"

import { LoginFormData, RegisterFormData } from "../../types/user"
import AxiosClient from "../AxiosClient"

export const localLoginUrl = async ({ email, password }: LoginFormData) => {
  const { data } = await AxiosClient.post("/auth/login", {
    email,
    password,
  })
  return data
}

export const UseLocalLogin = () => {
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

export const UseLocalRegister = () => {
  return useMutation(["user"], localRegister)
}

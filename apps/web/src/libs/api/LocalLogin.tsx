import { useMutation } from "@tanstack/react-query"

import { User } from "../../types/user"
import AxiosClient from "../AxiosClient"

export const localLoginUrl = async ({
  email,
  password,
}: Required<Pick<User, "email" | "password">>) => {
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
}: Required<Pick<User, "email" | "password" | "name" | "username">>) => {
  const { data } = await AxiosClient.post("/auth/register", {
    email,
    password,
    name,
    username,
  })
  return data
}

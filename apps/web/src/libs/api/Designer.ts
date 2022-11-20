import { useQuery, UseQueryOptions } from "@tanstack/react-query"

import { Designer } from "../../types/designer"
import AxiosClient from "../AxiosClient"

const GetDesignerUrl = async () => {
  const data = await AxiosClient.get<Designer>(`/users/me/designer`)
  return data.data
}

const GetOtherDesignerUrl = async (id: string) => {
  const data = await AxiosClient.get<Designer>(`/designer/${id}`)
  return data.data
}

const GetDesignerProductsUrl = async (id: string, page?: number) => {
  const data = await AxiosClient.get<Designer>(
    `/designers/${id}/products?page=${page ?? 1}`
  )
  return data.data
}

export const UseGetMyDesigner = (
  options: UseQueryOptions<Designer, Error, Designer, string[]> = {}
) => {
  const { data, isLoading, error } = useQuery(
    ["user", "designer"],
    () => GetDesignerUrl(),
    options
  )
  return { designer: data, isLoading, error }
}

export const UseGetDesigner = (id: string) => {
  const { data, isLoading, error } = useQuery(["designer", id], () =>
    GetOtherDesignerUrl(id)
  )
  return { designer: data, isLoading, error }
}

export const UseGetDesignerProducts = ({
  id,
  page,
}: {
  id?: string
  page?: number
}) => {
  const { data, isLoading, error } = useQuery(
    ["designer", id, "products", page],
    () => GetDesignerProductsUrl(id ?? "", page),
    {
      enabled: !!id,
    }
  )
  return { products: data, isLoading, error }
}

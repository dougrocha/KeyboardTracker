import { useQuery, UseQueryOptions } from "@tanstack/react-query"

import { PaginationParams } from "./types"

import { Designer } from "../../types/designer"
import { Product } from "../../types/product"
import AxiosClient from "../AxiosClient"

interface DesignerProducts {
  products: Product[]
  count: number
}

const GetDesignerUrl = async () => {
  const data = await AxiosClient.get<Designer>(`/user/me/designer`)
  return data.data
}

const GetOtherDesignerUrl = async (id: string) => {
  const data = await AxiosClient.get<Designer>(`/designer/${id}`)
  return data.data
}

const GetDesignerProductsUrl = async (
  id: string,
  { page = 1, perPage = 10 }: PaginationParams
) => {
  const data = await AxiosClient.get<DesignerProducts>(
    `/designer/${id}/products?page=${page}&perPage=${perPage}`
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
  pagination,
}: {
  id?: string
  pagination: PaginationParams
}) => {
  return useQuery(
    ["designer", id, "products", pagination?.page],
    () => GetDesignerProductsUrl(id ?? "", pagination),
    {
      enabled: !!id,
    }
  )
}

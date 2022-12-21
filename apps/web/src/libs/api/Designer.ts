import { Designer, Product, User } from "@meka/database"
import { PaginationParams } from "@meka/types"
import {
  MutationOptions,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query"

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

const CreateProductUrl = async (
  designerId?: string,
  product?: Omit<Product, "id">
) => {
  const data = await AxiosClient.post<Omit<Product, "id">>(
    `/designer/${designerId}/products`,
    product
  )
  return data.data
}

const UpdateProductUrl = async (designerId?: string, product?: Product) => {
  const data = await AxiosClient.patch<Product>(
    `/designer/${designerId}/products/${product?.id}`,
    product
  )
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

export const useGetMyDesigner = (
  options: UseQueryOptions<Designer, Error, Designer, string[]> = {}
) => {
  const { data, isLoading, error } = useQuery(
    ["user", "designer"],
    () => GetDesignerUrl(),
    options
  )
  return { designer: data, isLoading, error }
}

export const useGetDesigner = (id: string) => {
  const { data, isLoading, error } = useQuery(["designer", id], () =>
    GetOtherDesignerUrl(id)
  )
  return { designer: data, isLoading, error }
}

const UpdateDesignerUrl = async (id: string, user: Partial<Designer>) => {
  const data = await AxiosClient.patch<Designer>(`/designer/` + id, user)
  return data.data
}

export const useUpdateDesigner = (
  id: string,
  options?: MutationOptions<Partial<Designer>, unknown, Designer, unknown>
) => {
  return useMutation((user: Partial<Designer>) => UpdateDesignerUrl(id, user), {
    ...options,
  })
}

export const useGetDesignerProducts = ({
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

export const useCreateDesignerProduct = (
  designerId?: string,
  options?: MutationOptions<
    Omit<Product, "id">,
    unknown,
    Omit<Product, "id">,
    unknown
  >
) => {
  return useMutation(
    (product: Omit<Product, "id">) => CreateProductUrl(designerId, product),
    {
      ...options,
    }
  )
}

export const useUpdateDesignerProduct = (
  designerId?: string,
  options?: MutationOptions<Product, unknown, Product, unknown>
) => {
  const queryClient = useQueryClient()
  return useMutation(
    (product: Product) => UpdateProductUrl(designerId, product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["designer", designerId, "products"])
      },
      ...options,
    }
  )
}

const CreateDesigner = async (designer: Partial<Designer>) => {
  const data = await AxiosClient.post<Partial<Designer>>(`/designer`, designer)
  return data.data
}

export const useCreateDesigner = (
  options?: MutationOptions<
    Partial<Designer>,
    unknown,
    Partial<Designer>,
    unknown
  >
) => {
  return useMutation(
    (designer: Partial<Designer>) => CreateDesigner(designer),
    {
      ...options,
    }
  )
}

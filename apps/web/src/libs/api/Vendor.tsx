import { ProductWithPrice, Vendor } from "@meka/database"
import {
  AddVendorProduct,
  PaginatedResults,
  PaginationParams,
} from "@meka/types"
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query"

import AxiosClient from "../AxiosClient"

const GetMyVendorUrl = async () => {
  const data = await AxiosClient.get<Vendor[]>(`user/me/vendors`)
  return data.data
}

const GetVendorProducts = async (
  id: string,
  pagination: PaginationParams = { page: 1, perPage: 10 }
): Promise<PaginatedResults<ProductWithPrice>> => {
  const { data } = await AxiosClient.get(
    `/vendor/${id}/products?page=${pagination.page}&perPage=${pagination.perPage}`
  )
  return data
}

const GetVendorUrl = async (id: string) => {
  const data = await AxiosClient.get<Vendor>(`vendor/${id}`)
  return data.data
}

const CreateVendorProductUrl = async (product: AddVendorProduct) => {
  const { data } = await AxiosClient.post<AddVendorProduct>(
    `/vendor/${product.vendorId}/products`,
    product
  )
  return data
}

const UpdateVendorProductUrl = async (
  vendorId: string,
  productId: string,
  product: Partial<ProductWithPrice>
) => {
  const { data } = await AxiosClient.patch<Partial<ProductWithPrice>>(
    `/vendor/${vendorId}/products/${productId}`,
    product
  )
  return data
}

export const useUpdateVendorProduct = ({
  vendorId,
  productId,
}: {
  vendorId: string
  productId: string
}) => {
  const queryClient = useQueryClient()

  const { mutate, ...rest } = useMutation(
    (product: Partial<ProductWithPrice>) =>
      UpdateVendorProductUrl(vendorId, productId, product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["vendor", vendorId, "products"])
      },
    }
  )

  return { updateProduct: mutate, ...rest }
}

export const useCreateVendorProduct = ({ vendorId }: { vendorId: string }) => {
  const queryClient = useQueryClient()

  const { mutate, ...rest } = useMutation(CreateVendorProductUrl, {
    onSuccess: () => {
      queryClient.invalidateQueries(["vendor", vendorId, "products"])
    },
  })

  return { createProduct: mutate, ...rest }
}

export const useGetVendors = (
  options: UseQueryOptions<Vendor[], Error, Vendor[], string[]> = {}
) => {
  const { data, ...rest } = useQuery(
    ["user", "vendors"],
    () => GetMyVendorUrl(),
    options
  )

  return { vendors: data, ...rest }
}

export const useGetVendorProducts = (
  id: string,
  pagination?: PaginationParams
) => {
  const { data, ...rest } = useQuery(
    ["vendor", id, "products", pagination],
    () => GetVendorProducts(id, pagination),
    {
      enabled: !!id,
      keepPreviousData: true,
    }
  )

  return {
    products: data?.data,
    count: data?.count,
    ...rest,
  }
}

export const useGetVendor = (
  id: string,
  options: UseQueryOptions<Vendor, Error, Vendor, string[]> = {}
) => {
  const { data, ...rest } = useQuery(
    ["vendor", id],
    () => GetVendorUrl(id),
    options
  )

  return { vendor: data, ...rest }
}

const CreateVendorUrl = async (vendor: Partial<Vendor>) => {
  const { data } = await AxiosClient.post<Partial<Vendor>>(`/vendor`, vendor)
  return data
}

export const useCreateVendor = () => {
  const queryClient = useQueryClient()

  const { mutate, ...rest } = useMutation(CreateVendorUrl, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user", "vendors"])
    },
  })

  return { createVendor: mutate, ...rest }
}

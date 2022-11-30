import { FormWithFieldsAndValues } from "@meka/database"

import AxiosClient from "../AxiosClient"

export async function GetFormByProductId(id: string) {
  const res = await AxiosClient.get<FormWithFieldsAndValues>(
    `/product/${id}/form`,
    {
      decompress: true,
    }
  )
  return res.data
}

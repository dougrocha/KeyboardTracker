import { Form } from "../../types/form"
import AxiosClient from "../AxiosClient"

export async function GetFormByProductId(id: string): Promise<Form> {
  const res = await AxiosClient.get<Form>(`/product/${id}/form`)
  return res.data
}

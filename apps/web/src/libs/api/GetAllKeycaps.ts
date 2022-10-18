import { Keycaps } from "../../types/keycaps"
import AxiosClient from "../AxiosClient"

interface GetAllKeycaps {
  /**
   * If true, will only return ids of keycaps
   */
  id?: boolean
  take?: number
  skip?: number
  all?: boolean
}

/**
 * @default { id: false, take: 100, skip: 0 }
 */
export default async function GetAllKeycaps({
  id = false,
  take = 100,
  skip = 0,
  all = false,
}: GetAllKeycaps): Promise<Keycaps[]> {
  const data = await AxiosClient.get(
    `/keycaps?take=${take}&skip=${skip}&id=${id}&all=${all}`
  ).then((res) => {
    return res.data
  })

  return data
}

//

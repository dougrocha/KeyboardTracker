import { PaginationParams, PaginatedResults } from '@meka/types'

export default interface BaseService<T> {
  create(data: T): Promise<T>

  findMany(): Promise<T[]>
  findMany(params?: PaginationParams): Promise<PaginatedResults<T>>

  findOne(id: string): Promise<T>
  update(id: string, data: T): Promise<T>
  delete(id: string): Promise<T>
}

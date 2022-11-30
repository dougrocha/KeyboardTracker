import { PaginatedResults } from "./paginated-results.interface"

export type MaybePaginated<T> = T[] | PaginatedResults<T>

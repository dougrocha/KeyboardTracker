import { useState } from "react"

interface UseFormPageProps {
  start?: number
  formLength: number
}

export const useFormPages = ({ start = 0, formLength }: UseFormPageProps) => {
  const [page, setPage] = useState<number>(start)

  const changePage = (go: "NEXT" | "PREV") => {
    if (page === 0 && go === "PREV") return
    if (page === formLength && go === "NEXT") return
    go === "NEXT" ? setPage(page + 1) : setPage(page - 1)
  }

  return { page, changePage }
}

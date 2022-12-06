import { useState } from "react"

interface useFormPageProps {
  start?: number
  formLength: number
}

export const useFormPages = ({ start = 0, formLength }: useFormPageProps) => {
  const [page, setPage] = useState<number>(start)

  const changePage = (go: "NEXT" | "PREV") => {
    if (page === 0 && go === "PREV") return
    if (page === formLength && go === "NEXT") return
    go === "NEXT" ? setPage(page + 1) : setPage(page - 1)
  }

  return { page, changePage }
}

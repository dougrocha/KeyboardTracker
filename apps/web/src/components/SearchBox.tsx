import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { SearchProducts } from "../libs/api/SearchProducts"
import { Product } from "../types/product"

type SearchInputs = {
  search: string
}

const SearchBox = ({
  className,
  placeholder,
}: {
  className?: string
  placeholder?: string
}) => {
  const { register, handleSubmit, watch } = useForm<SearchInputs>()
  const [searchResults, setSearchResults] = useState<
    Pick<Product, "id" | "name">[]
  >([])

  const watchSearch = watch("search")

  console.log("watchSearch", watchSearch)

  const onSubmit: SubmitHandler<SearchInputs> = async (data) => {
    console.log(data)
    const products = await SearchProducts(data.search)
    setSearchResults(products)
  }

  console.log("searchResults", searchResults)

  return (
    <div
      className={`relative rounded-md bg-gray-500/30 px-4 py-2 pl-8 ${className}`}
    >
      <form method="get" onSubmit={handleSubmit(onSubmit)}>
        <MagnifyingGlassIcon className="icon-sm absolute top-1/2 left-2 -translate-y-1/2" />
        <input
          type="text"
          placeholder={placeholder}
          className="appearance-none bg-inherit outline-none"
          {...register("search", { required: true, minLength: 1 })}
        />
      </form>
    </div>
  )
}

export default SearchBox

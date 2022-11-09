import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/router"
import React, { ChangeEvent, useEffect, useState, useTransition } from "react"
import { useForm } from "react-hook-form"

import { SearchProducts } from "../libs/api/SearchProducts"
import { Product } from "../types/product"

const SearchBox = ({
  className,
  placeholder,
}: {
  className?: string
  placeholder?: string
}) => {
  const { register, handleSubmit } = useForm()
  const [isPending, startTransition] = useTransition()
  const [searchTerm, setSearchTerm] = useState("")

  const [searchResults, setSearchResults] = useState<
    Pick<Product, "id" | "name">[]
  >([])

  const { query, push } = useRouter()

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const { value } = e.target

    setSearchTerm(value)

    const results = await SearchProducts(value)

    startTransition(() => {
      setSearchResults(results)
    })
  }

  const onSubmit = () => {
    if (!searchTerm) {
      push("/products")
      return
    }

    push(`/products?search=${searchTerm}`)
    setSearchResults([])
  }

  return (
    <div
      className={`relative bg-gray-500/30 px-4 py-2 pl-8 transition-transform ${className} ${
        searchResults.length ? "rounded-t-md" : "rounded-md"
      }`}
    >
      <form method="get" onSubmit={handleSubmit(onSubmit)}>
        <MagnifyingGlassIcon className="icon-sm absolute top-1/2 left-2 -translate-y-1/2" />
        {isPending && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            Loading...
          </div>
        )}
        <input
          type="text"
          placeholder={placeholder}
          className="w-full appearance-none bg-inherit outline-none"
          onChange={handleSearch}
        />
        {searchResults.length > 0 && (
          <div className="absolute top-full left-0 w-full rounded-b-md bg-white text-black shadow-md dark:bg-gray-700 dark:text-white">
            {searchResults.map((p) => (
              <div key={p.id} className="p-2">
                {p.name}
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  )
}

export default SearchBox

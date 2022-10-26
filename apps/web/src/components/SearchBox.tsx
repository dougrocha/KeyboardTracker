import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import React, { ChangeEvent, useState, useTransition } from "react"
import { SearchProducts } from "../libs/api/SearchProducts"
import { Product } from "../types/product"

const SearchBox = ({
  className,
  placeholder,
}: {
  className?: string
  placeholder?: string
}) => {
  const [isPending, startTransition] = useTransition()

  const [searchResults, setSearchResults] = useState<
    Pick<Product, "id" | "name">[]
  >([])

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (!e.currentTarget.value) {
      setSearchResults([])
      return
    }

    const products = await SearchProducts(e.currentTarget.value)
    startTransition(() => {
      setSearchResults(products)
    })
  }

  return (
    <div
      className={`relative rounded-md bg-gray-500/30 px-4 py-2 pl-8 ${className}`}
    >
      <form method="get">
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
          onChange={handleChange}
        />
        {searchResults.length > 0 && (
          <div className="absolute top-full left-0 w-full rounded-md bg-white shadow-md">
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

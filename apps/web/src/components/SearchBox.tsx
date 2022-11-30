import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { Product } from "@meka/database"
import classNames from "classnames"
import { useRouter } from "next/router"
import React, { useEffect, useState, useTransition } from "react"

import Form from "./Forms/Form"
import Input from "./Forms/Input"

import useDebounce from "../hooks/useDebounce"
import { SearchProducts } from "../libs/api/SearchProducts"

interface SearchBoxProps {
  placeholder?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl"
}

const SearchBox = ({ placeholder, maxWidth }: SearchBoxProps) => {
  const [isPending, startTransition] = useTransition()
  const [query, setQuery] = useState("")

  const debouncedSearch = useDebounce(query, 500)

  const [searchResults, setSearchResults] = useState<
    Pick<Product, "id" | "name">[]
  >([])

  const { push } = useRouter()

  useEffect(() => {
    if (debouncedSearch.length < 0) {
      setSearchResults([])
      return
    }

    const getResults = async () => {
      const res = await SearchProducts(debouncedSearch, {
        perPage: 5,
      })
      startTransition(() => {
        setSearchResults(res)
      })
    }

    getResults()

    return () => {
      setSearchResults([])
    }
  }, [debouncedSearch])

  const onSubmit = () => {
    if (!query) {
      push("/products")
      return
    }

    push(`/products?search=${query}`)
    setSearchResults([])
  }

  return (
    <Form
      onSubmit={onSubmit}
      className={classNames(
        `relative bg-gray-500/30 px-2.5 py-2 pl-10 transition-transform`,
        searchResults.length ? "rounded-t-md" : "rounded-md",
        maxWidth ? `max-w-${maxWidth}` : "max-w-sm"
      )}
    >
      <MagnifyingGlassIcon className="absolute top-1/2 left-2.5 h-5 w-5 -translate-y-1/2" />
      <Input
        id="search"
        type="text"
        hideLabel
        placeholder={isPending ? "Loading..." : placeholder ?? "Search..."}
        readOnly={isPending}
        disabled={isPending}
        validation={{
          onChange: (e) => {
            setQuery(e.target.value)
          },
        }}
      />
      {searchResults.length > 0 && (
        <div className="absolute top-full left-0 w-full rounded-b-md bg-white text-black shadow-md dark:bg-gray-700 dark:text-white">
          <>
            {searchResults
              .filter((val) => {
                if (!query) return null
                return val.name.toLowerCase().includes(query.toLowerCase())
              })
              .map((p, i) => {
                i === 0 ? (
                  <div key={p.id} className="p-2">
                    {p.name}
                  </div>
                ) : null
              })}
            {searchResults
              .filter((val) => {
                if (!query) return val
                return val.name.toLowerCase().includes(query.toLowerCase())
              })
              .map((p) => (
                <div key={p.id} className="p-2">
                  {p.name}
                </div>
              ))}
          </>
        </div>
      )}
    </Form>
  )
}

export default SearchBox

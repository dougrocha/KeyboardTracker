import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import classNames from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { Suspense, useState } from "react"

import Form from "./Forms/Form"
import Input from "./Forms/Input"

import useDebounce from "../hooks/useDebounce"
import { useProductSearch } from "../libs/api/SearchProducts"

interface SearchBoxProps {
  placeholder?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl"
}

const SearchBox = ({ placeholder, maxWidth }: SearchBoxProps) => {
  const [query, setQuery] = useState("")

  const router = useRouter()

  const deferredQuery = useDebounce(query, 500)
  const isStale = query !== deferredQuery

  const onSubmit = () => {
    router.push({
      pathname: "/products",
      query: { search: query },
    })
  }

  return (
    <Form
      onSubmit={onSubmit}
      className={classNames(
        `relative h-full w-full max-w-sm shadow-sm`,
        maxWidth ? `sm:max-w-${maxWidth}` : "sm:max-w-md"
      )}
    >
      <MagnifyingGlassIcon className="absolute top-1/2 left-3 z-10 h-5 w-5 -translate-y-1/2 text-black dark:text-white" />
      <Input
        id="search"
        type="text"
        hideLabel
        className={classNames(
          "h-14 pl-9",
          isStale ? "bg-gray-100 dark:bg-gray-800" : "bg-white dark:bg-gray-900"
        )}
        rounded={{
          position: query ? "t" : undefined,
        }}
        autoComplete="off"
        value={query}
        placeholder={placeholder ?? "Search..."}
        validation={{
          onChange: (e) => setQuery(e.target.value),
        }}
      />
      <Suspense
        fallback={
          <div
            className={classNames(
              "absolute inset-x-0 top-auto z-10 w-full rounded-b-md border border-t-0 border-indigo-500 bg-indigo-50 p-4 text-black shadow-md duration-500 dark:bg-gray-800 dark:text-white",
              isStale ? "animate-pulse" : ""
            )}
          >
            Loading...
          </div>
        }
      >
        <SearchResults query={query} isStale={isStale} />
      </Suspense>
    </Form>
  )
}

const SearchResults = React.memo(function ({
  query,
  isStale,
}: {
  query?: string
  isStale?: boolean
}) {
  const { data } = useProductSearch(query?.trim(), {}, { enabled: !isStale })

  const filteredData = React.useCallback(() => {
    return (
      data?.data?.filter((product) => {
        return product.name.toLowerCase().includes(query?.toLowerCase() ?? "")
      }) ?? []
    )
  }, [data, query])

  if (!query) {
    return null
  }

  return (
    <ul
      className={classNames(
        "absolute inset-x-0 top-auto z-10 max-h-min min-h-full w-full max-w-full rounded-b-md border border-t-0 border-indigo-500 bg-indigo-50 text-black shadow-md duration-500 dark:bg-gray-800 dark:text-white",
        isStale ? "animate-pulse" : ""
      )}
    >
      <>
        {filteredData().map((p) => {
          return (
            <li key={p.id}>
              <Link
                href={`/products/${p.id}`}
                className="flex justify-between p-2"
              >
                <p>{p.name}</p>
                <span className="w-1/2 truncate text-gray-500 dark:text-gray-400">
                  {p.description}
                </span>
              </Link>
            </li>
          )
        })}

        {filteredData().length === 0 && (
          <li className="flex whitespace-nowrap p-4">
            No matches for &quot;<i className="min-w-0 truncate">{query}</i>
            &quot;
          </li>
        )}

        <li>
          <Link href={`/products`}>
            <p className="h-full w-full border-t border-indigo-300 p-2 text-center text-indigo-600 transition-colors hover:bg-indigo-600 hover:text-white dark:text-white dark:hover:bg-gray-700">
              Check out more products...
            </p>
          </Link>
        </li>
      </>
    </ul>
  )
})

// h-full w-full border-t border-indigo-300 p-2 text-center text-indigo-600 transition-colors hover:bg-indigo-600 dark:text-white dark:hover:bg-gray-700

SearchResults.displayName = "SearchResults"

export default SearchBox

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"

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

  const onSubmit: SubmitHandler<SearchInputs> = (data) => console.log(data)

  console.log(watch("search"))

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

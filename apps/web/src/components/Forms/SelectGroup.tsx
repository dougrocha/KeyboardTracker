import classNames from "classnames"
import React, { useId } from "react"

import BaseInput from "./BaseInput"

interface SelectGroupProps {
  label: string
  children: React.ReactNode
  helperText?: string
  inline?: boolean
  className?: string
}

const SelectGroup = ({
  label,
  children,
  inline,
  className,
}: SelectGroupProps) => {
  const groupId = useId()

  return (
    <BaseInput id={groupId} label={label}>
      <fieldset
        className={classNames(
          "flex h-full flex-col gap-y-4 rounded-md border p-4",
          inline && "gap-x-4 sm:flex-row",
          !inline && "gap-y-4 sm:flex-col",
          className
        )}
      >
        <legend className="hidden text-sm font-medium text-gray-700">
          {label}
        </legend>

        {children}
      </fieldset>
    </BaseInput>
  )
}

export default SelectGroup

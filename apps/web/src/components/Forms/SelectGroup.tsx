import classNames from "classnames"
import React, { useId } from "react"

import BaseInput from "./BaseInput"

interface SelectGroupProps {
  label: string
  children: React.ReactNode
  helperText?: string
  inline?: boolean
}

const SelectGroup = ({ label, children, inline }: SelectGroupProps) => {
  const groupId = useId()

  return (
    <BaseInput id={groupId} label={label}>
      <fieldset
        className={classNames(
          "flex h-full px-4",
          inline && "flex-row gap-x-4",
          !inline && "flex-col gap-y-4"
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

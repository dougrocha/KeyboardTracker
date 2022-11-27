import classNames from "classnames"
import { get } from "lodash"
import React, { ComponentPropsWithoutRef } from "react"
import { RegisterOptions, useFormContext } from "react-hook-form"

import BaseInput from "./BaseInput"
import InputErrorIcon from "./InputErrorIcon"

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label?: string
  id: string
  placeholder?: string
  helperText?: string
  readOnly?: boolean
  hideLabel?: boolean
  icon?: JSX.Element
  validation?: RegisterOptions
}

const Input = ({
  label,
  id,
  placeholder,
  type = "text",
  helperText,
  readOnly = false,
  validation,
  icon,
  hideLabel,
  ...rest
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <BaseInput
      id={id}
      label={label}
      helperText={helperText}
      hideLabel={hideLabel}
    >
      <input
        type={type}
        id={id}
        readOnly={readOnly}
        placeholder={placeholder}
        className={classNames(
          "block w-full rounded border-none font-medium shadow-sm",
          readOnly &&
            "cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0",
          !readOnly &&
            get(errors, id) &&
            "border-red-300 bg-red-50 focus:border-red-300 focus:ring-0",
          !readOnly &&
            !get(errors, id) &&
            "focus:ring-primary-500 focus:border-primary-500 border-gray-300"
        )}
        aria-describedby={rest.name ?? id}
        {...register?.(id, {
          required: rest.required,
          ...validation,
        })}
        {...rest}
      />
      {icon ? React.cloneElement(icon) : <InputErrorIcon id={id} />}
    </BaseInput>
  )
}

export default Input

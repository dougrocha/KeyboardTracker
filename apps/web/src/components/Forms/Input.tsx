import classNames from "classnames"
import { get } from "lodash"
import React, { ComponentPropsWithoutRef, useId } from "react"
import { RegisterOptions, useFormContext } from "react-hook-form"

import BaseInput from "./BaseInput"
import InputErrorIcon from "./InputErrorIcon"

interface InputProps
  extends Omit<ComponentPropsWithoutRef<"input">, "placeholder"> {
  label?: string
  id: string
  placeholder?: string | null
  helperText?: string
  readOnly?: boolean
  hideLabel?: boolean
  icon?: JSX.Element
  validation?: RegisterOptions
  rounded?: {
    size?: "sm" | "md" | "lg"
    position?: "t" | "b" | "l" | "r" | "tl" | "tr" | "bl" | "br" | "none"
  }
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
  className,
  rounded,
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
        readOnly={readOnly}
        placeholder={placeholder ?? undefined}
        className={classNames(
          className,
          `rounded${rounded?.position ? `-${rounded.position}` : ""}-${
            rounded?.size ?? "md"
          }`,
          "block w-full border-2 font-medium shadow-sm dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 sm:border sm:text-base sm:leading-5",
          readOnly &&
            "cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0",
          !readOnly &&
            get(errors, id) &&
            "border-red-300 bg-red-50 focus:border-red-300 focus:ring-0 dark:border-red-500 dark:bg-red-100 dark:focus:border-red-500",
          !readOnly &&
            !get(errors, id) &&
            "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        )}
        aria-describedby={rest.name ?? id}
        aria-invalid={errors.name ? "true" : "false"}
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

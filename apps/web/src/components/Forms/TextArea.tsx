import classNames from "classnames"
import { get } from "lodash"
import { ComponentPropsWithoutRef } from "react"
import { RegisterOptions, useFormContext } from "react-hook-form"

import BaseInput from "./BaseInput"
import InputErrorIcon from "./InputErrorIcon"

interface TextAreaProps extends ComponentPropsWithoutRef<"textarea"> {
  label?: string
  id: string
  placeholder?: string
  height?: `h-${number}`
  resize?: "none" | "both" | "horizontal" | "vertical"
  helperText?: string
  readOnly?: boolean
  hideLabel?: boolean
  validation?: RegisterOptions
  rounded?: {
    size?: "sm" | "md" | "lg"
    position?: "t" | "b" | "l" | "r" | "tl" | "tr" | "bl" | "br" | "none"
  }
}

const TextArea = (props: TextAreaProps) => {
  const {
    label,
    id,
    placeholder,
    helperText,
    readOnly = false,
    validation,
    hideLabel = true,
    height = "h-24",
    resize,
    rounded,
    ...rest
  } = props

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
      <textarea
        id={id}
        readOnly={readOnly}
        placeholder={placeholder}
        className={classNames(
          "block w-full border-2 font-medium shadow-sm dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 sm:border sm:text-base sm:leading-5",
          `rounded${rounded?.position ? `-${rounded.position}` : ""}-${
            rounded?.size ?? "md"
          }`,
          height,
          resize === "none" && "resize-none",
          resize === "both" && "resize",
          resize === "horizontal" && "resize-x",
          resize === "vertical" && "resize-y",
          readOnly &&
            "cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0",
          !readOnly &&
            get(errors, id) &&
            "border-red-300 bg-red-50 focus:border-red-300 focus:ring-0 dark:border-red-500 dark:bg-red-100 dark:focus:border-red-500",
          !readOnly &&
            !get(errors, id) &&
            "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        )}
        aria-describedby={id}
        {...register(id, {
          required: rest.required,
          ...validation,
        })}
        {...rest}
      />
      <InputErrorIcon id={id} position="top-right" />
    </BaseInput>
  )
}

export default TextArea

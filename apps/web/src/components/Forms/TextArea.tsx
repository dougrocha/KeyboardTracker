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
          "block w-full rounded border-none font-medium shadow-sm",
          height,
          resize === "none" && "resize-none",
          resize === "both" && "resize",
          resize === "horizontal" && "resize-x",
          resize === "vertical" && "resize-y",
          readOnly &&
            "cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0",
          !readOnly &&
            get(errors, id) &&
            "border-red-300 bg-red-50 focus:border-red-300 focus:ring-0",
          !readOnly &&
            !get(errors, id) &&
            "focus:ring-primary-500 focus:border-primary-500 border-gray-300"
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

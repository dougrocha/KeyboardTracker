import { ComponentPropsWithoutRef } from "react"
import { RegisterOptions } from "react-hook-form"

import Input from "./Input"

interface NumberProps extends ComponentPropsWithoutRef<"input"> {
  label?: string
  id: string
  placeholder?: string
  helperText?: string
  readOnly?: boolean
  hideLabel?: boolean
  validation?: RegisterOptions
  /**
   * Will validate numbers.
   *
   * By default this will validate numbers greater than 0.
   */
  validateNumber?: (value: number) => boolean
}

const Number = ({
  label,
  id,
  placeholder,
  helperText,
  readOnly = false,
  validation,
  validateNumber,
  hideLabel = true,
  ...rest
}: NumberProps) => {
  return (
    <Input
      id={id}
      label={label}
      readOnly={readOnly}
      placeholder={placeholder}
      hideLabel={hideLabel}
      helperText={helperText}
      type="number"
      validation={{
        valueAsNumber: true,
        validate: validateNumber,
        required: rest.required,
        ...validation,
      }}
      {...rest}
    />
  )
}

export default Number

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import React, { ComponentPropsWithoutRef, useState } from "react"
import { RegisterOptions } from "react-hook-form"

import Input from "./Input"

interface HiddenInputProps extends ComponentPropsWithoutRef<"input"> {
  label: string
  id: string
  placeholder?: string
  type?: never
  helperText?: string
  readOnly?: boolean
  validation?: RegisterOptions
}

const HiddenInput = ({
  label,
  id,
  placeholder = "",
  helperText,
  readOnly = false,
  validation,
  ...rest
}: HiddenInputProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => setShowPassword(!showPassword)

  return (
    <Input
      id={id}
      label={label}
      name={"password"}
      type={showPassword ? "text" : "password"}
      readOnly={readOnly}
      placeholder={placeholder}
      validation={{
        required: rest.required,
        ...validation,
      }}
      helperText={helperText}
      icon={
        <button
          onClick={(e) => {
            e.preventDefault()
            toggleShowPassword()
          }}
          aria-label="Toggle password visibility"
          aria-pressed={showPassword}
          aria-describedby="password"
          aria-controls="password"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5 text-gray-500"
        >
          {showPassword ? (
            <EyeIcon className="h-6 w-6 text-gray-500 hover:text-gray-600" />
          ) : (
            <EyeSlashIcon className="h-6 w-6 text-gray-500 hover:text-gray-600" />
          )}
        </button>
      }
    />
  )
}

export default HiddenInput

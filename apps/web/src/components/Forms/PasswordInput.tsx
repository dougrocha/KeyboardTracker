import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"
import React, { ComponentPropsWithoutRef, useState } from "react"
import { RegisterOptions, useFormContext } from "react-hook-form"

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
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => setShowPassword(!showPassword)

  return (
    <div>
      <label htmlFor={id} className="block text-sm">
        {label}
      </label>
      <div className="relative mt-1 w-full">
        <input
          {...register(id, validation)}
          {...rest}
          type={showPassword ? "text" : "password"}
          name={id}
          id={id}
          readOnly={readOnly}
          placeholder={placeholder}
          className={classNames(
            "block w-full rounded border-none font-medium shadow-sm",
            readOnly &&
              "cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0",
            !readOnly &&
              errors[id] &&
              "border-red-300 bg-red-50 focus:border-red-300 focus:ring-0",
            !readOnly &&
              !errors[id] &&
              "focus:ring-primary-500 focus:border-primary-500 border-gray-300"
          )}
          aria-describedby="password"
        />
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
      </div>
      <div className="mt-1">
        {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
        {errors[id] && (
          <span className="text-sm text-red-500">
            {errors[id]?.message as string}
          </span>
        )}
      </div>
    </div>
  )
}

export default HiddenInput

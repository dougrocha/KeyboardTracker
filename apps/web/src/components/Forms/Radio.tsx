import classNames from "classnames"
import { ComponentPropsWithoutRef } from "react"
import { RegisterOptions, useFormContext } from "react-hook-form"

interface RadioProps extends ComponentPropsWithoutRef<"input"> {
  label: string
  id: string
  flipped?: boolean
  placeholder?: string
  helperText?: string
  readOnly?: boolean
  validation?: RegisterOptions
}

const Radio = ({
  label,
  id,
  placeholder,
  helperText,
  readOnly = false,
  validation,
  flipped = false,
  ...rest
}: RadioProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div
      className={classNames(
        "flex flex-row items-center space-x-4",
        flipped && "flex-row-reverse"
      )}
    >
      <div className="mt-1 w-full">
        <input
          type="radio"
          id={id}
          readOnly={readOnly}
          placeholder={placeholder}
          className={classNames(
            "block h-5 w-5 rounded border-none font-medium shadow-sm",
            readOnly &&
              "cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0",
            !readOnly &&
              errors[id] &&
              "border-red-300 bg-red-50 focus:border-red-300 focus:ring-0",
            !readOnly &&
              !errors[id] &&
              "focus:ring-primary-500 focus:border-primary-500 border-gray-300"
          )}
          aria-describedby={id}
          {...register(id, validation)}
          {...rest}
        />
      </div>
      <label htmlFor={id} className="block text-sm">
        {label}
      </label>
      <div className="mt-1">
        {helperText && <p className="text-xs text-gray-500">{helperText}</p>}
        {errors[id] ? (
          <span className="text-sm text-red-500">
            {errors[id]?.message as string}
          </span>
        ) : null}
      </div>
    </div>
  )
}

export default Radio

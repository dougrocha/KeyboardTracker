import classNames from "classnames"
import { ComponentPropsWithoutRef } from "react"
import { RegisterOptions, useFormContext } from "react-hook-form"

interface BooleanProps extends ComponentPropsWithoutRef<"input"> {
  label: string
  id: string
  placeholder?: string
  helperText?: string
  readOnly?: boolean
  validation?: RegisterOptions
}

const Boolean = ({
  label,
  id,
  placeholder,
  helperText,
  readOnly = false,
  validation,
  ...rest
}: BooleanProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div>
      <label htmlFor={id} className="block text-sm">
        {label}
      </label>
      <div className="relative mt-1 w-full">
        <input
          type="checkbox"
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
          aria-describedby={id}
          {...register(id, validation)}
          {...rest}
        />
      </div>
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

export default Boolean

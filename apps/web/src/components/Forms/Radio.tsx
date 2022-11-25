import classNames from "classnames"
import { get } from "lodash"
import { ComponentPropsWithoutRef } from "react"
import { RegisterOptions, useFormContext } from "react-hook-form"

interface RadioProps extends ComponentPropsWithoutRef<"input"> {
  label: string
  id: string
  readOnly?: boolean
  validation?: RegisterOptions
}

const Radio = ({
  label,
  id,
  placeholder,
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
    <div className="flex min-w-max flex-row gap-x-4">
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
      <label htmlFor={id} className="block text-sm">
        {label}
      </label>
    </div>
  )
}

export default Radio

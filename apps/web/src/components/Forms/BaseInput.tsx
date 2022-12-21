import classNames from "classnames"
import { get } from "lodash"
import React from "react"
import { useFormContext } from "react-hook-form"

interface BaseInputProps extends React.PropsWithChildren {
  id: string
  label?: string
  hideLabel?: boolean
  helperText?: string
  labelStyle?: string
}

const BaseInput = ({
  id,
  label,
  helperText,
  hideLabel = false,
  labelStyle,
  children,
}: BaseInputProps) => (
  <div>
    {hideLabel ? (
      <span className="relative block">{children}</span>
    ) : (
      <label
        className={classNames(
          "block text-sm text-black dark:text-white",
          labelStyle
        )}
      >
        {label}
        <span className="relative block">{children}</span>
      </label>
    )}

    <FormFieldHelper id={id} text={helperText} />
  </div>
)

const FormFieldHelper = ({ id, text }: { id: string; text?: string }) => {
  const {
    formState: { errors },
  } = useFormContext()

  if (!text && !get(errors, id)) return null

  return (
    <div className="mt-1 pl-1">
      {text ? <p className="text-xs text-gray-500">{text}</p> : null}
      {get(errors, id) ? (
        <span className="text-sm text-red-500" role="alert">
          {get(errors, id)?.message as string}
        </span>
      ) : null}
    </div>
  )
}

export default BaseInput

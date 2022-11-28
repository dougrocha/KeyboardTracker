import { get } from "lodash"
import React from "react"
import { useFormContext } from "react-hook-form"

interface BaseInputProps extends React.PropsWithChildren {
  id: string
  label?: string
  hideLabel?: boolean
  helperText?: string
}

const BaseInput = ({
  id,
  label,
  helperText,
  hideLabel = false,
  children,
}: BaseInputProps) => (
  <div className="relative">
    {hideLabel ? null : (
      <label htmlFor={id} className="block text-sm">
        {label}
      </label>
    )}
    {children}
    <FormFieldHelper id={id} text={helperText} />
  </div>
)

const FormFieldHelper = ({ id, text }: { id: string; text?: string }) => {
  const {
    formState: { errors },
  } = useFormContext()

  if (!text && !get(errors, id)) return null

  return (
    <div className="mt-1">
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

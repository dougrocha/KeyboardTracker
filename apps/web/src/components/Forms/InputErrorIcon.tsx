import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"
import { get } from "lodash"
import React from "react"
import { useFormContext } from "react-hook-form"

type Position =
  | "center-right"
  | "center-left"
  | "top-right"
  | "bottom-right"
  | "top-left"
  | "bottom-left"

const InputErrorIcon = ({
  id,
  position = "center-right",
}: {
  id: string
  position?: Position
}) => {
  const {
    formState: { errors },
  } = useFormContext()

  return get(errors, id) ? (
    <div
      className={classNames(
        "pointer-events-none absolute flex items-center",
        position === "top-right" && "top-4 right-4",
        position === "bottom-right" && "bottom-4 right-4",
        position === "center-right" && "inset-y-0 right-4",
        position === "center-left" && "inset-y-0 left-4",
        position === "top-left" && "top-4 left-4",
        position === "bottom-left" && "bottom-4 left-4"
      )}
    >
      <ExclamationCircleIcon className="h-6 w-6 text-red-600" />
    </div>
  ) : null
}

export default InputErrorIcon

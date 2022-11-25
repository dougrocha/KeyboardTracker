import { ComponentPropsWithoutRef } from "react"
import { RegisterOptions } from "react-hook-form"

import Checkbox from "./Checkbox"
import SelectGroup from "./SelectGroup"

interface BooleanProps extends ComponentPropsWithoutRef<"input"> {
  label: string
  id: string
  placeholder?: string
  helperText?: string
  readOnly?: boolean
  validation?: RegisterOptions
}

const Boolean = ({ label, id, ...rest }: BooleanProps) => (
  <SelectGroup label={label}>
    <Checkbox id={id} label={label} {...rest} />
  </SelectGroup>
)

export default Boolean

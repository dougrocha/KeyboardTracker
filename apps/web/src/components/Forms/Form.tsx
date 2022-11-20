import React from "react"
import { FormProvider, useForm } from "react-hook-form"

interface FormProps {
  children: React.ReactNode
}

const Form = ({ children }: FormProps) => {
  const methods = useForm()

  return <FormProvider {...methods}>{children}</FormProvider>
}

export default Form

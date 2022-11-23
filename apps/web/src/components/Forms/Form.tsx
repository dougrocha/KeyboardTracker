import React from "react"
import {
  useForm,
  SubmitHandler,
  FieldValues,
  FormProvider,
  DeepPartial,
  Resolver,
} from "react-hook-form"

interface FormProps<T extends FieldValues>
  extends Omit<React.HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  defaultValues?: DeepPartial<T>
  onSubmit: SubmitHandler<T>
  resolver?: Resolver<T>
}

function Form<T extends FieldValues>({
  defaultValues,
  onSubmit,
  children,
  className,
  resolver,
  ...rest
}: React.PropsWithChildren<FormProps<T>>) {
  const methods = useForm<T>({ defaultValues, resolver })

  return (
    <FormProvider {...methods} {...rest}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            React.cloneElement(child, {
              ...{
                ...child.props,
                register: methods.register,
                errors: methods.formState.errors,
              },
            })
          }
          return child
        })}
      </form>
    </FormProvider>
  )
}

export default Form

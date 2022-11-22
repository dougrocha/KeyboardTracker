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
            return React.cloneElement(child, {
              key: child.props.name,
              ...child.props,
              ...methods.register,
            })
          }
          return child
        })}
      </form>
    </FormProvider>
  )
}

// const Form = <T>({
//   defaultValues,
//   children,
//   onSubmit,
// }: FormProps<T> & { children: ReactElement | ReactElement[] }) => {
//   const methods = useForm({ defaultValues })

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={methods.handleSubmit(onSubmit)}>
//         {children.map(children, (child: JSX.Element) => {
//           return child.props.name
//             ? createElement(child.type, {
//                 ...{
//                   key: child.props.name,
//                   ...child.props,
//                   ...methods.register,
//                 },
//               })
//             : child
//         })}
//       </form>
//     </FormProvider>
//   )
// }

export default Form

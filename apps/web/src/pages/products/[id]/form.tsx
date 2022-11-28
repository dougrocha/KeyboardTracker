import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import dynamic from "next/dynamic"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import create, { useStore } from "zustand"
import { devtools } from "zustand/middleware"

import { GetFormByProductId } from "../../../libs/api/GetFormByProductId"
import { FieldType, Form as FormType, FormField } from "../../../types/form"

const Boolean = dynamic(() => import("../../../components/Forms/Boolean"))
const Input = dynamic(() => import("../../../components/Forms/Input"))
const SelectGroup = dynamic(
  () => import("../../../components/Forms/SelectGroup")
)
const Number = dynamic(() => import("../../../components/Forms/Number"))
const TextArea = dynamic(() => import("../../../components/Forms/TextArea"))
const Radio = dynamic(() => import("../../../components/Forms/Radio"))
const Checkbox = dynamic(() => import("../../../components/Forms/Checkbox"))

export interface SingleValueResponse {
  // Page == Form field position
  page: number
  value: string | boolean | number
  // All Single value responses are stored here
  valueType: keyof Omit<typeof FieldType, "SELECT">
}

export interface MultipleValueResponse {
  // Page == Form field position
  page: number
  valueType: keyof Pick<typeof FieldType, "SELECT">

  /**
   * Checkbox | Select | Radio selections
   * All Multiple Choices values will be stored here.
   */
  multiple: string[]
}

export type FormResponse = SingleValueResponse | MultipleValueResponse

interface FormState {
  /**
   * Responses
   * All responses will be stored here.
   *
   * @type Map<number, FormResponse>
   * @example
   * Map<Page_Number, Response>
   */
  responses: Map<number, FormResponse>
  addResponse: (response: FormResponse) => void
  removeResponse: (index: number) => void
  clearForm: () => void
}

const useFormStore = create(
  devtools<FormState>(
    (set) => ({
      responses: new Map<number, FormResponse>(),
      addResponse: (response: FormResponse) =>
        set((state) => ({
          // add only unique page responses otherwise replace
          responses: state.responses.set(response.page, response),
        })),
      removeResponse: (index: number) =>
        set((state) => {
          state.responses.delete(index)
          return { responses: state.responses }
        }),
      clearForm: () =>
        set((state) => {
          state.responses.clear()
          return { responses: state.responses }
        }),
    }),
    {
      name: "Form Store",
    }
  )
)

interface FormPageProps {
  form: FormType
}

const FormPage = ({ form }: FormPageProps) => {
  const methods = useForm({ mode: "onBlur" })
  const { getValues } = methods

  const { addResponse } = useStore(useFormStore)

  const savePage = (field: FormField) => {
    if (field.type === FieldType.SELECT) {
      addResponse({
        page: field.position,
        valueType: field.type,
        multiple: getValues(`fields.${field?.position}.multiple`),
      })
    } else {
      addResponse({
        page: field.position,
        valueType: field.type,
        value: getValues(`fields.${field?.position}.value`),
      })
    }
  }

  const onSubmit = methods.handleSubmit((data: unknown) => {
    form.fields.map((field) => {
      savePage(field)
    })
  })

  return (
    <div className="mx-auto h-full w-full max-w-screen-md p-2 py-10">
      <header className="flex h-40 flex-col justify-center">
        <h1 className="text-4xl font-bold text-gray-800">{form.name}</h1>

        <p className="text-gray-600">{form.description}</p>

        <p className="mt-2 text-gray-500">{form.fields.length} questions</p>
      </header>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className="space-y-10">
          {form.fields.map((field) => (
            <div
              key={field.id}
              className="rounded-md bg-gray-200 px-10 py-6 shadow"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {field.position + 1}. {field.name}
              </h2>

              <p className="mb-8 mt-2 px-1 text-gray-600">
                {field.description}
              </p>

              <FormDisplay field={field} />
            </div>
          ))}

          <footer className="mt-10 flex justify-end">
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              Save
            </button>
          </footer>
        </form>
      </FormProvider>
    </div>
  )
}

const FormDisplay = ({ field }: { field: FormField }) => {
  switch (field.type) {
    case FieldType.TEXT:
      return <Input id={`fields.${field?.position}.value`} label={field.name} />
    case FieldType.TEXTAREA:
      return (
        <TextArea
          id={`fields.${field?.position}.value`}
          label={field.name}
          height="h-56"
          resize="none"
        />
      )
    case FieldType.NUMBER:
      return (
        <Number id={`fields.${field?.position}.value`} label={field.name} />
      )
    case FieldType.BOOLEAN:
      return (
        <Boolean id={`fields.${field?.position}.value`} label={field.name} />
      )
    case FieldType.SELECT:
      return (
        <SelectGroup label={field.name}>
          {field.values?.map((option, index) => (
            <Checkbox
              key={index}
              id={`fields.${field?.position}.multiple`}
              label={option.value}
              value={option.id}
            />
          ))}
        </SelectGroup>
      )
    case FieldType.RADIO:
      return (
        <SelectGroup label={field.name}>
          {field.values?.map((option, index) => (
            <Radio
              key={index}
              id={`fields.${field?.position}.value`}
              label={option.value}
              value={option.id}
            />
          ))}
        </SelectGroup>
      )
    default:
      return <div>Not Found</div>
  }
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<FormPageProps>> {
  const productId = context.query.id as string

  const form = await GetFormByProductId(productId)

  return {
    props: {
      form,
    },
  }
}

export default FormPage

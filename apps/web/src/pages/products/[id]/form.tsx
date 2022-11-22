import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import dynamic from "next/dynamic"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import create, { useStore } from "zustand"
import { devtools } from "zustand/middleware"

import Form from "../../../components/Forms/Form"
import { useFormPages } from "../../../hooks/useFormPages"
import { GetFormByProductId } from "../../../libs/api/GetFormByProductId"
import { FieldType, Form as FormType, FormField } from "../../../types/form"

const Boolean = dynamic(() => import("../../../components/Forms/Boolean"))
const Input = dynamic(() => import("../../../components/Forms/Input"))
const MultiSelect = dynamic(
  () => import("../../../components/Forms/MultiSelect")
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
  const methods = useForm()
  const { getValues } = methods

  const { addResponse } = useStore(useFormStore)

  const { page, changePage } = useFormPages({ formLength: form.fields.length })

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

  const onSubmit = (data: unknown) => {
    console.log(data)
  }

  return (
    <>
      <Form<FormResponse> onSubmit={onSubmit}>
        {form.fields.map((field, index) =>
          field.position === page ? (
            <>
              <PageDisplay key={index} field={field} />
              <div className="flex w-full max-w-md items-end justify-between">
                <button
                  className="rounded px-4 py-2"
                  onClick={() => changePage("PREV")}
                >
                  Go Back
                </button>
                <button
                  className="rounded px-4 py-2"
                  onClick={() => {
                    savePage(field)
                    changePage("NEXT")
                  }}
                >
                  Go Next
                </button>
              </div>
            </>
          ) : null
        )}
      </Form>
      {/* <FormProvider {...methods}>
        <form
          onSubmit={onSubmit}
          className="flex h-screen w-full items-center justify-center p-2 lg:p-10"
        >
          {form.fields.map((field, index) => {
            if (field.position === page) {
              return (
                <div
                  key={index}
                  className="flex h-full w-full flex-col items-center justify-center"
                >
                  <header className="flex h-40 w-full max-w-screen-2xl flex-col items-start bg-red-500 p-10">
                    <h1 className="mb-4 text-5xl font-bold">{field.name}</h1>
                    <p className="mb-4">{field.description}</p>
                  </header>

                  <div className="flex h-full w-full flex-col items-center justify-center space-y-10 bg-blue-500 p-1">
                    <PageDisplay field={field} />
                    <div className="flex w-full max-w-md items-end justify-between">
                      <button
                        className="rounded px-4 py-2"
                        onClick={() => changePage("PREV")}
                      >
                        Go Back
                      </button>
                      <button
                        className="rounded px-4 py-2"
                        onClick={() => {
                          savePage(field)
                          changePage("NEXT")
                        }}
                      >
                        Go Next
                      </button>
                    </div>
                  </div>
                </div>
              )
            }
          })}
        </form>
      </FormProvider> */}
    </>
  )
}

const PageDisplay = ({ field }: { field: FormField }) => {
  switch (field.type) {
    case FieldType.TEXT:
      return <Input id={`fields.${field?.position}.value`} label={field.name} />
    case FieldType.TEXTAREA:
      return (
        <TextArea id={`fields.${field?.position}.value`} label={field.name} />
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
        <MultiSelect label={field.name}>
          {field.values?.map((option, index) => (
            <Checkbox
              key={index}
              id={`fields.${field?.position}.multiple`}
              label={option.value}
              value={option.id}
            />
          ))}
        </MultiSelect>
      )
    case FieldType.RADIO:
      return (
        <MultiSelect label={field.name}>
          {field.values?.map((option, index) => (
            <Radio
              key={index}
              id={`fields.${field?.position}.value`}
              label={option.value}
              value={option.id}
            />
          ))}
        </MultiSelect>
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

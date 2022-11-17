import { GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import React from "react"
import create, { useStore } from "zustand"
import Input from "../../../components/Forms/Input"

import { GetFormByProductId } from "../../../libs/api/GetFormByProductId"
import { Form } from "../../../types/form"

export interface FormResponse {
  // Page == Form field position
  page: number
  value: string
  valueType: "boolean" | "string" | "number"

  // Checkbox | Select | Radio selections
  multiple: {
    value: string
  }[]
}

interface FormState {
  responses: FormResponse[]
  setResponse: (responses: FormResponse[]) => void
  removeResponse: (index: number) => void
  clearForm: () => void
}

const useFormStore = create<FormState>((set, get) => ({
  responses: [] as FormResponse[],
  setResponse: (responses: FormResponse[]) => set({ responses }),
  removeResponse: (index: number) => {
    set((state: { responses: FormResponse[] }) => {
      const responses = state.responses
      responses.splice(index, 1)
      return { responses }
    })
  },
  clearForm: () => set({ responses: [] }, true),
}))

const getPageResponse = (page: number) =>
  useFormStore.getState().responses.find((response) => response.page === page)

interface FormPageProps {
  form: Form
}

const FormPage = ({ form }: FormPageProps) => {
  const { responses, setResponse } = useStore(useFormStore)

  return (
    <div className="flex h-screen flex-col items-center justify-center rounded p-10">
      <div className="flex h-full w-full max-w-screen-2xl bg-red-500">
        <h1 className="mb-4 text-2xl font-bold">{form.name}</h1>
        <p className="mb-4">{form.description}</p>
      </div>

      <div className="flex h-full w-full max-w-screen-2xl bg-blue-500">
        <div className="flex w-full flex-row divide-x">
          {form.fields.map((field, index) => (
            <div
              key={index}
              className="flex w-full flex-col items-center justify-center border-b border-gray-300"
            >
              <p>Page: {index}</p>
              <p>{field.name}</p>
              {field.type === "TEXT" && (
                <>
                  <input type="text" />
                </>
              )}
              {field.type === "SELECT" && (
                <>
                  <select>
                    {field.values?.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.position}: {option.value}
                      </option>
                    ))}
                  </select>
                </>
              )}
              {field.type === "RADIO" && (
                <>
                  {field.values?.map((option, index) => (
                    <div key={index}>
                      <input type="radio" name={field.name} />
                      <label>{option.value}</label>
                    </div>
                  ))}
                </>
              )}
              {field.type === "TEXTAREA" && (
                <>
                  <textarea />
                </>
              )}
              {field.type === "NUMBER" && (
                <>
                  <input type="number" />
                </>
              )}
              {field.type === "BOOLEAN" && (
                <>
                  <input type="checkbox" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
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

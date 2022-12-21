import { ArrowPathIcon, CheckCircleIcon } from "@heroicons/react/20/solid"
import { yupResolver } from "@hookform/resolvers/yup"
import { Product, ProductType } from "@meka/database"
import React from "react"
import * as yup from "yup"

import Form from "./Forms/Form"
import Input from "./Forms/Input"
import Radio from "./Forms/Radio"
import SelectGroup from "./Forms/SelectGroup"
import TextArea from "./Forms/TextArea"
import { DialogClose, useDialogState } from "./ModalDialog"

import {
  useCreateDesignerProduct,
  useGetMyDesigner,
} from "../libs/api/Designer"

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string(),
  type: yup
    .mixed<ProductType>()
    .required(
      `Type is required. Must be one of ${Object.values(ProductType)})}`
    )
    .test({
      name: "type",
      message: `Type is required. Must be one of ${Object.values(
        ProductType
      )})}`,
      test: (value) =>
        Object.values(ProductType).includes(value as ProductType),
    }),
})

const CreateDesignerProduct = () => {
  const { setOpen } = useDialogState()

  const { designer } = useGetMyDesigner()

  const { mutate, isLoading, isSuccess } = useCreateDesignerProduct(
    designer?.id ?? ""
  )

  if (!designer) return <p>Something is wrong.</p>

  const onSubmit = (data: Omit<Product, "id">) => {
    mutate(data)
    setTimeout(() => setOpen(false), 1000)
  }

  return (
    <>
      <Form<Omit<Product, "id">>
        onSubmit={onSubmit}
        resolver={yupResolver(schema)}
        className="mt-4 flex flex-col gap-y-4"
      >
        <Input
          id="name"
          name="name"
          label="Name"
          required
          helperText="This is the name of your product. It will be displayed on the product page."
        />
        <TextArea
          hideLabel={false}
          helperText="Describe your product"
          id="description"
          name="description"
          label="Description"
        />
        <SelectGroup label="Type" inline className="bg-gray-100">
          <Radio
            id="type"
            value={ProductType.KEYBOARD}
            label="Keyboard"
            required
            className="bg-gray-400 shadow"
          />
          <Radio
            id="type"
            value={ProductType.KEYCAP_SET}
            label="Keycaps"
            required
            className="bg-gray-400 shadow"
          />
          <Radio
            id="type"
            value={ProductType.SWITCH}
            label="Keycaps"
            required
            className="bg-gray-400 shadow"
          />
        </SelectGroup>

        <div className="flex flex-row items-center justify-end gap-x-4">
          <DialogClose
            type="button"
            className="flex items-center gap-x-2 rounded-md bg-gray-300 px-4 py-2 text-gray-800 shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
          >
            Cancel
          </DialogClose>

          <button
            type="submit"
            className="flex items-center gap-x-2 rounded-md bg-gray-800 px-4 py-2 text-white shadow-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
          >
            {isLoading && !isSuccess ? (
              <span className="animate-spin">
                <ArrowPathIcon className="h-5 w-5" />
              </span>
            ) : (
              "Create"
            )}
            {isSuccess && (
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            )}
          </button>
        </div>
      </Form>
    </>
  )
}

export default CreateDesignerProduct

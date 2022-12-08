import { yupResolver } from "@hookform/resolvers/yup"
import { Product, ProductType } from "@meka/database"
import { useRouter } from "next/router"
import React from "react"
import * as yup from "yup"

import Form from "./Forms/Form"
import Input from "./Forms/Input"
import Radio from "./Forms/Radio"
import SelectGroup from "./Forms/SelectGroup"
import TextArea from "./Forms/TextArea"

import {
  useCreateDesignerProduct,
  useGetDesigner,
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
  const { designer } = useGetMyDesigner()

  const { mutate } = useCreateDesignerProduct(designer?.id ?? "")

  if (!designer) return <p>Something is wrong.</p>

  const onSubmit = (data: Omit<Product, "id">) => {
    console.log(data)
    mutate(data)
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
        <button
          type="submit"
          className="mt-6 rounded bg-green-400 px-4 py-2 font-medium text-black"
        >
          Create Product
        </button>
      </Form>
    </>
  )
}

export default CreateDesignerProduct

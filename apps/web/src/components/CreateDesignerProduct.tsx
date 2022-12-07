import React from "react"

import Form from "./Forms/Form"
import Input from "./Forms/Input"
import Radio from "./Forms/Radio"
import SelectGroup from "./Forms/SelectGroup"
import TextArea from "./Forms/TextArea"

const CreateDesignerProduct = () => {
  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <>
      <Form onSubmit={onSubmit} className="mt-4 flex flex-col gap-y-4">
        <Input
          id="name"
          name="name"
          label="Name"
          helperText="This is the name of your product. It will be displayed on the product page."
        />
        <TextArea
          hideLabel={false}
          helperText="Describe your product"
          id="description"
          name="description"
          label="Description"
        />
        <Input id="price" name="price" label="Price" />
        <SelectGroup label="Type" inline className="bg-gray-100">
          <Radio
            id="type"
            value="keyboard"
            label="Keyboard"
            required
            className="bg-gray-400 shadow"
          />
          <Radio
            id="type"
            value="keycaps"
            label="Keycaps"
            required
            className="bg-gray-400 shadow"
          />
        </SelectGroup>
        <button className="mt-6 rounded bg-green-400 px-4 py-2 font-medium text-black">
          Create Product
        </button>
      </Form>
    </>
  )
}

export default CreateDesignerProduct

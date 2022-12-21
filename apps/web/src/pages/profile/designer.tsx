import { ArrowPathIcon, CheckCircleIcon } from "@heroicons/react/20/solid"
import { PlusIcon } from "@heroicons/react/24/outline"
import { yupResolver } from "@hookform/resolvers/yup"
import { Designer, Product, ProductWithPrice } from "@meka/database"
import { PaginationState } from "@tanstack/react-table"
import { useRouter } from "next/router"
import React, { useState } from "react"
import * as yup from "yup"

import { SaveButtonGroup } from "."

import CreateDesignerProduct from "../../components/CreateDesignerProduct"
import Form from "../../components/Forms/Form"
import Input from "../../components/Forms/Input"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeading,
  DialogDescription,
  DialogClose,
  useDialogState,
} from "../../components/ModalDialog"
import ProductsTable from "../../components/ProductsTable"
import ProfileHeader from "../../components/Profile/ProfileHeader"
import ProfileSection from "../../components/Profile/ProfileSection"
import ProfileLayout from "../../layouts/ProfileLayout"
import {
  useGetDesignerProducts,
  useGetMyDesigner,
  useUpdateDesignerProduct,
} from "../../libs/api/Designer"
import { useUpdateVendorProduct } from "../../libs/api/Vendor"

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  username: yup.string().required(),
  email: yup.string().email("Invalid email address"),
})

const DesignerPage = () => {
  const [readOnly, setReadOnly] = useState(true)

  const { designer } = useGetMyDesigner()

  if (!designer) return <DesignerCreatePage />

  const onSubmit = (data: Designer) => {
    console.log(data)
  }

  return (
    <>
      <ProfileHeader
        title={
          <>
            <b>Welcome Back! </b>{" "}
            <span className="capitalize">
              {designer.name ?? designer.username}
            </span>
          </>
        }
      />

      <ProfileSection>
        <Form<Designer>
          defaultValues={designer}
          onSubmit={onSubmit}
          className="mt-8 max-w-sm space-y-4"
          resolver={yupResolver(schema)}
        >
          <Input required id="name" label="Name" readOnly={readOnly} />
          <Input required id="username" label="Username" readOnly={readOnly} />
          <Input
            id="email"
            label="Email"
            readOnly={readOnly}
            helperText="This email is mainly used for support."
          />

          <SaveButtonGroup
            readOnly={readOnly}
            setReadOnly={setReadOnly}
            defaultValues={designer}
          />
        </Form>
      </ProfileSection>

      <ProfileSection className="relative mt-10 block p-2">
        <CreateProductButton />
      </ProfileSection>

      <DesignerTable />
    </>
  )
}

DesignerPage.getLayout = (page: React.ReactNode) => (
  <ProfileLayout>{page}</ProfileLayout>
)

const CreateProductButton = () => {
  return (
    <Dialog>
      <DialogTrigger className="flex w-min items-center justify-center space-x-2 rounded bg-indigo-500 px-3 py-1 text-white">
        <span className="whitespace-nowrap text-lg font-medium">
          Create Product
        </span>
        <PlusIcon className="h-6 w-6" />
      </DialogTrigger>
      <DialogContent className="m-4 max-w-4xl rounded bg-primary-light px-2 py-12 sm:px-8 lg:w-1/2">
        <DialogHeading className="text-3xl font-semibold">
          Create a new Product
        </DialogHeading>
        <DialogDescription className="mt-2 text-lg text-neutral-600">
          Don&apos;t worry you can always edit this later.
        </DialogDescription>
        <CreateDesignerProduct />
      </DialogContent>
    </Dialog>
  )
}

const DesignerCreatePage = () => {
  return (
    <>
      <ProfileHeader title="Create your designer today!" />
    </>
  )
}

const DesignerTable = () => {
  const { designer } = useGetMyDesigner()

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    })

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )

  const { data, isLoading, error, refetch, isRefetching } =
    useGetDesignerProducts({
      id: designer?.id,
      pagination: {
        page: pagination.pageIndex + 1,
        perPage: pagination.pageSize,
      },
    })

  return (
    <>
      <ProductsTable
        products={data?.products}
        productCount={data?.count}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
        isRefetching={isRefetching}
        pagination={pagination}
        setPagination={setPagination}
        visibility={{ price: false }}
        editComponent={EditProductView}
      />
    </>
  )
}

interface EditProductViewProps {
  product: ProductWithPrice | Product
}

const EditProductView = ({ product }: EditProductViewProps) => {
  const { setOpen } = useDialogState()

  const { designer } = useGetMyDesigner()

  const { mutate, isSuccess, isLoading } = useUpdateDesignerProduct(
    designer?.id
  )

  const onSubmit = async (data: ProductWithPrice | Product) => {
    mutate(data)
    setTimeout(() => setOpen(false), 1000)
  }

  return (
    <Form<ProductWithPrice | Product>
      onSubmit={onSubmit}
      defaultValues={product}
      className="mt-4 flex flex-col gap-y-4"
    >
      <Input
        id={`name`}
        label="Name"
        type="text"
        placeholder={product.name}
        className="rounded border"
      />
      {/* If the product has a price show this option, this is mainly for products on the vendor side */}
      {"price" in product ? (
        <Input
          id={`price`}
          label="Price"
          type="number"
          placeholder={product.price?.toString()}
          min={0}
          step={0.01}
          className="rounded border"
        />
      ) : null}
      <Input
        id={`description`}
        label="Description"
        type="text"
        placeholder={product.description}
        className="rounded border"
      />

      {/* date for group buy start date */}
      <Input
        id={`groupBuyStartDate`}
        label="Group Buy Start Date"
        type="date"
        placeholder={product.groupBuyStartDate?.toString()}
        className="rounded border"
      />
      {/* date for group buy end date */}
      <Input
        id={`groupBuyEndDate`}
        label="Group Buy End Date"
        type="date"
        placeholder={product.groupBuyEndDate?.toString()}
        className="rounded border"
      />

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
          {isSuccess && <CheckCircleIcon className="h-5 w-5 text-green-500" />}
        </button>
      </div>
    </Form>
  )
}

export default DesignerPage

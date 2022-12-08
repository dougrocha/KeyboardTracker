import { PlusIcon } from "@heroicons/react/24/outline"
import { yupResolver } from "@hookform/resolvers/yup"
import { Designer } from "@meka/database"
import { PaginationState } from "@tanstack/react-table"
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
} from "../../components/ModalDialog"
import ProductsTable from "../../components/ProductsTable"
import ProfileHeader from "../../components/Profile/ProfileHeader"
import ProfileSection from "../../components/Profile/ProfileSection"
import ProfileLayout from "../../layouts/ProfileLayout"
import {
  useGetDesignerProducts,
  useGetMyDesigner,
} from "../../libs/api/Designer"

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
            <DialogClose className="mt-6 w-full rounded bg-red-400 px-4 py-2 font-medium text-black">
              Cancel
            </DialogClose>
          </DialogContent>
        </Dialog>
      </ProfileSection>

      <DesignerTable />
    </>
  )
}

DesignerPage.getLayout = (page: React.ReactNode) => (
  <ProfileLayout>{page}</ProfileLayout>
)

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
      />
    </>
  )
}

export default DesignerPage

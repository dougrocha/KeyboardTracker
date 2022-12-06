import { PaginationState } from "@tanstack/react-table"
import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"

import Input from "../../components/Forms/Input"
import ProductsTable from "../../components/ProductsTable"
import ProfileHeader from "../../components/Profile/ProfileHeader"
import ProfileSection from "../../components/Profile/ProfileSection"
import ProfileLayout from "../../layouts/ProfileLayout"
import {
  useGetDesignerProducts,
  useGetMyDesigner,
} from "../../libs/api/Designer"

const DesignerPage = () => {
  const methods = useForm()
  const { handleSubmit, reset } = methods

  const [readOnly, setReadOnly] = useState(true)

  const { designer } = useGetMyDesigner({
    onSuccess: (data) => {
      // On success, reset the form with the new data
      reset(data)
    },
  })

  if (!designer) return <DesignerCreatePage />

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

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
        <FormProvider {...methods}>
          <form onSubmit={onSubmit} className="mt-8 max-w-sm space-y-4">
            <Input id="name" label="Name" readOnly={readOnly} />
            <Input id="username" label="Username" readOnly={readOnly} />
            <Input id="email" label="Email" readOnly={readOnly} />

            <div className="flex flex-col space-y-2 text-white sm:flex-row sm:justify-between sm:space-y-0">
              <button
                className="w-32 rounded bg-gray-600 px-4 py-2 text-center text-white"
                onClick={() => {
                  setReadOnly(!readOnly)
                  if (!readOnly) reset(designer)
                }}
                type="button"
              >
                {readOnly ? "Edit" : "Cancel"}
              </button>
              {!readOnly && (
                <button
                  className="w-32 cursor-pointer rounded bg-gray-600 px-4 py-2 text-white"
                  value="Save"
                  type="submit"
                >
                  Save
                </button>
              )}
            </div>
          </form>
        </FormProvider>
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
      />
    </>
  )
}

export default DesignerPage
